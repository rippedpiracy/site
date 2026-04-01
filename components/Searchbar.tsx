import { DocSearch } from "@docsearch/react";

const config = {
  appId: import.meta.env.VITE_ALGOLIA_APP_ID ?? "YXKOI5NILL",
  apiKey: import.meta.env.VITE_ALGOLIA_API_KEY ?? "d23967e8d3cb288f2724946939799ede",
  index: import.meta.env.VITE_ALGOLIA_INDEX_NAME ?? "ripped-guide",
};

export default function Searchbar() {
  return (
    <DocSearch
      appId={config.appId}
      apiKey={config.apiKey}
      indices={[config.index]}
      placeholder="Search docs"
      transformItems={(items) =>
        items.map((hit) => {
          const url = new URL(hit.url);
          url.host = location.host;
          url.protocol = location.protocol;
          url.port = location.port;
          hit.url = url.toString();

          if (hit.url_without_anchor) {
            const url = new URL(hit.url_without_anchor);
            url.host = location.host;
            url.protocol = location.protocol;
            url.port = location.port;
            hit.url_without_anchor = url.toString();
          }

          return hit;
        })
      }
      insights
    />
  );
}
