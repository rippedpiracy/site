import "./stylesheets/tailwind.css";
import "./stylesheets/styles.css";
import "./stylesheets/scrollbar.css";
import "./stylesheets/whitney/whitney.css";
import "./stylesheets/prism.css";
import "./stylesheets/youtube.css";

import { ViteReactSSG } from "vite-react-ssg";
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import routes from "~react-pages";

import classNames from "@lib/classnames";
import { ThemeProvider } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import LoadingBar from "./components/LoadingBar";
import MDX from "./components/MDX";
import Menu from "./components/Menu";
import MenuContext from "./contexts/MenuContext";
import "@docsearch/css";
import { CodegenLanguageProvider } from "./lib/type-generator/store";
import OnThisPage from "./components/OnThisPage";
import { ThemeWatcher } from "./components/ThemeWatcher";
import navigationData from "./components/navigation/data.json";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setOpen = useCallback(() => setSidebarOpen(true), []);
  const setClose = useCallback(() => setSidebarOpen(false), []);
  const location = useLocation();

  useEffect(() => {
    let pageTitle = "Ripped";
    let pageDescription = "";

    for (const section of navigationData) {
      const page = section.pages.find((p) => p.link === location.pathname || p.link + "/" === location.pathname);
      if (page) {
        pageTitle = `${page.name} - Ripped`;
        pageDescription = page.description || pageDescription;
        break;
      }
    }

    if (pageTitle === "Ripped") {
      // Don't even wanna know what unholy situation leads to a page missing from nav
      requestAnimationFrame(() => {
        const h1Title = document.querySelector("h1")?.textContent?.trim();
        if (h1Title && document.title !== `${h1Title} - Ripped`) {
          document.title = `${h1Title} - Ripped`;
        }
      });
    }

    if (document.title !== pageTitle) {
      document.title = pageTitle;
    }

    const setMeta = (selector: string, content: string, attribute = "content") => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, content);
      }
    };

    setMeta('meta[name="description"]', pageDescription);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', pageDescription);
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', pageDescription);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", window.location.origin + location.pathname);
    }
  }, [location.pathname]);

  const fadeClasses = classNames("sidebar-fade", {
    open: sidebarOpen,
    closed: !sidebarOpen,
  });

  const component = (
    <CodegenLanguageProvider>
      <MDX>
        <Outlet />
      </MDX>
    </CodegenLanguageProvider>
  );

  return (
    <>
      <LoadingBar />
      <ThemeProvider
        defaultTheme="system"
        attribute="data-theme"
        themes={["light", "dark", "amoled"]}
        value={{
          light: "light",
          dark: "dark",
          amoled: "dark",
        }}
      >
        <MenuContext.Provider value={{ open: sidebarOpen, setOpen, setClose }}>
          <ThemeWatcher />
          <div className="app-wrapper">
            <div className={fadeClasses} onClick={() => setSidebarOpen(false)} />
            <Menu />
            {component}
            <OnThisPage />
          </div>
          <Footer />
        </MenuContext.Provider>
      </ThemeProvider>
    </>
  );
}

export const createRoot = ViteReactSSG({
  routes: [
    {
      path: "/",
      element: <App />,
      children: routes,
    },
  ],
  customCreateRouter: (routes, opts) => {
    // Strip loaders injected by vite-react-ssg since we don't use React Router loaders
    // This stops it from fetching useless static-loader-data json files on client navigation/hydration
    const removeLoaders = (r: RouteObject[]) => {
      for (const route of r) {
        delete route.loader;
        if (route.children) {
          removeLoaders(route.children);
        }
      }
    };
    removeLoaders(routes);
    return createBrowserRouter(routes, opts);
  },
});
