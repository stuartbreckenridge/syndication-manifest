import { absoluteAssetUrl, feedAssets } from "./feedAssets";

const defaultBaseUrl = new URL("https://syndicationmanifest.org");

export const getDiscoveryDocument = (baseUrl = defaultBaseUrl) => {
  const summaryIconUrl = absoluteAssetUrl(feedAssets.summaryIconPath, baseUrl);
  const fullIconUrl = absoluteAssetUrl(feedAssets.fullIconPath, baseUrl);
  const selfUri = new URL("/.well-known/syndication", baseUrl).toString();
  const specUri = new URL("/spec/0.1/", baseUrl).toString();

  return {
    version: "0.1",
    spec_uri: specUri,
    self_uri: selfUri,
    poll_interval_seconds: 3600,
    publication: {
      name: "Syndication Manifest",
      uri: new URL("/", baseUrl).toString(),
      description: "A draft specification for public syndication discovery.",
      language: "en",
      icon: summaryIconUrl,
      categories: ["specification", "syndication", "feeds", "open-web"]
    },
    contact: {
      name: "Syndication Manifest editor",
      uri: "https://github.com/stuartbreckenridge/SyndicationManifest/issues"
    },
    feeds: [
      {
        uri: new URL("/feed.xml", baseUrl).toString(),
        mime_type: "application/rss+xml",
        format_version: "2.0",
        rel: ["primary", "subscribe"],
        title: "Syndication Manifest Entries",
        icon_url: summaryIconUrl,
        description: "Updates about the /.well-known/syndication specification.",
        language: "en",
        categories: ["specification", "updates"],
        home_page_uri: new URL("/entries/", baseUrl).toString()
      },
      {
        uri: new URL("/feed-full.xml", baseUrl).toString(),
        mime_type: "application/rss+xml",
        format_version: "2.0",
        rel: ["alternate"],
        title: "Syndication Manifest Entries: Full Content",
        icon_url: fullIconUrl,
        description: "Full-content updates about the /.well-known/syndication specification.",
        language: "en",
        categories: ["specification", "updates", "full-content"],
        home_page_uri: new URL("/entries/", baseUrl).toString()
      },
      {
        uri: "https://stuartbreckenridge.net/feed.json",
        mime_type: "application/feed+json",
        format_version: "1.1",
        rel: ["alternate"],
        title: "Stuart Breckenridge",
        description: "Personal website feed from stuartbreckenridge.net.",
        language: "en",
        categories: ["personal blog"],
        home_page_uri: "https://stuartbreckenridge.net/"
      }
    ]
  };
};

export const discoveryDocument = getDiscoveryDocument();
