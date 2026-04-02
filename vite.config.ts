import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";
import pages from "vite-plugin-pages";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import remarkSupersub from "remark-supersub";
import remarkInjectTitle from "./lib/remarkInjectTitle";

// https://vite.dev/config/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "css-preload",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          const regex = /<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g;
          const hrefs: string[] = [];
          let match;
          while ((match = regex.exec(html)) !== null) hrefs.push(match[1]);
          if (!hrefs.length) return html;
          const preloads = hrefs
            .map((href) => `    <link rel="preload" as="style" href="${href}" crossorigin="">`)
            .join("\n");
          return html.replace("<head>", `<head>\n${preloads}`);
        },
      },
    },
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkInjectTitle, remarkMdxFrontmatter, remarkGfm, remarkSupersub],
      }),
    },
    react({
      include: /\.(jsx|tsx|mdx|md)$/,
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    pages({
      dirs: "pages",
      routeStyle: "next",
      extensions: ["tsx", "jsx", "ts", "js", "mdx", "md"],
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./components"),
      "@lib": path.resolve(__dirname, "./lib"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Work around uBlock Origin blocking /assets/push-notifications.js despite it NOT being a push notification script
        entryFileNames: "assets/page-[name].js",
        chunkFileNames: "assets/page-[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  ssgOptions: {
    onPageRendered: (route, html) => {
      // note: this could probably be moved to its own function instead of bloating vite.config.ts, unsure if it should be for now ~ darkerink
      const isBase = route === "/" || route === "/intro";
      const domain = process.env.BASE_DOMAIN || "ripped.guide";
      const baseUrl = `https://${domain}`;
      const url = `${baseUrl}${route === "/" ? "" : route.startsWith("/") ? route : `/${route}`}`;
      const siteName = "Ripped";
      const image = isBase ? `/banner.webp` : undefined;

      const normalize = (p: string) => {
        let s = p.replace(/\/+$/, "").toLowerCase();
        if (s && !s.startsWith("/")) s = "/" + s;
        return s || "/";
      };
      const normalizedRoute = normalize(route);

      let currentSection:
        | { name: string | null; pages: { link: string; name: string; description: string | null }[]; section: string }
        | undefined;
      let currentPage: { link: string; name: string; description: string | null } | undefined;

      try {
        const dataPath = path.resolve(__dirname, "./components/navigation/data.json");
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8")) as {
          name: string | null;
          pages: { link: string; name: string; description: string | null }[];
          section: string;
        }[];

        currentSection = data.find((s) => s.pages.some((p) => normalize(p.link) === normalizedRoute));

        if (currentSection) {
          currentPage = currentSection.pages.find((p) => normalize(p.link) === normalizedRoute);
        }
      } catch (e) {
        console.error(`[SEO] Failed to match route ${route}:`, e);
      }

      let finalTitle = currentPage?.name ? `${currentPage.name} - Ripped` : "Ripped";
      let finalDesc = currentPage?.description || (currentPage?.name ? "" : "Ripped Guide");

      if (route === "/404") {
        finalTitle = "404 - Ripped";
        finalDesc = "Wait, this is not where you're supposed to be! Please use the sidebar to navigate.";
      }

      // Calculate structured data after finding page info

      const structuredData = [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": baseUrl,
          "name": siteName,
          "alternateName": ["Ripped"],
        },
        !isBase && {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            currentSection?.name && {
              "@type": "ListItem",
              "position": 1,
              "name": currentSection.name,
              "item": `${baseUrl}/${currentSection.section === "__ROOT__" ? "" : currentSection.section}`,
            },
            {
              "@type": "ListItem",
              "position": currentSection?.name ? 2 : 1,
              "name": currentPage?.name || "Ripped",
              "item": url,
            },
          ].filter(Boolean),
        },
      ].filter(Boolean);

      const jsonLd = `<script type="application/ld+json">\n${JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData)}\n</script>`;
      const twitterImage = image
        ? `<meta name="twitter:image" content="${image}" key="twitter-image" />\n    <meta name="twitter:card" content="summary_large_image" key="twitter-card" />`
        : `<meta name="twitter:card" content="summary" key="twitter-card" />`;
      const ogImage = image ? `<meta property="og:image" content="${image}" key="og-image" />` : "";

      const customHead = route === "/" ? `
    <link rel="preload" href="/img/rippedtransparent-cropped.svg" as="image" type="image/svg+xml" fetchpriority="high">
    <link rel="preload" href="/img/ripped_banner.svg" as="image" type="image/svg+xml" fetchpriority="high">` : "";

      return html
        .replaceAll("__PLACEHOLDER_TITLE__", finalTitle)
        .replaceAll("__PLACEHOLDER_DESCRIPTION__", finalDesc)
        .replaceAll("__PLACEHOLDER_URL__", url)
        .replaceAll("__PLACEHOLDER_BASE_URL__", baseUrl)
        .replaceAll("<!-- __PLACEHOLDER_JSON_LD__ -->", jsonLd)
        .replaceAll("<!-- __PLACEHOLDER_TWITTER_IMAGE__ -->", twitterImage)
        .replaceAll("<!-- __PLACEHOLDER_OG_IMAGE__ -->", ogImage)
        .replaceAll("<!-- __PLACEHOLDER_HEAD__ -->", customHead);
    },
    onFinished: () => {
      // Clean up the useless static-loader-data folder that vite-react-ssg outputs
      const distDir = path.resolve(__dirname, "./dist");
      const loaderDataDir = path.join(distDir, "static-loader-data");
      if (fs.existsSync(loaderDataDir)) {
        fs.rmSync(loaderDataDir, { recursive: true, force: true });
      }

      // Clean up the generated manifest files
      const files = fs.readdirSync(distDir);
      for (const file of files) {
        if (file.startsWith("static-loader-data-manifest")) {
          fs.rmSync(path.join(distDir, file));
        }
      }
    },
  },
  preview: {
    allowedHosts: true,
  },
});
