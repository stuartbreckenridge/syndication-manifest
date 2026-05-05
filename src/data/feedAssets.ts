export const feedAssets = {
  fullIconPath: "/icons/syndication-full.png",
  summaryIconPath: "/icons/syndication-summary.png"
};

export const absoluteAssetUrl = (path: string, baseUrl: URL) =>
  new URL(path, baseUrl).toString();
