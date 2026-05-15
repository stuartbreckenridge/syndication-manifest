import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i += 1) {
        const child = node.children[i];
        walk(child);
        if (child.type === "element" && child.tagName === "table") {
          node.children[i] = {
            type: "element",
            tagName: "div",
            properties: { className: ["table-wrap"] },
            children: [child]
          };
        }
      }
    };
    walk(tree);
  };
}

export default defineConfig({
  site: "https://syndicationmanifest.org",
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeWrapTables]
  }
});
