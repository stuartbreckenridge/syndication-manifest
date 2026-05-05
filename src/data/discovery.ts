import { absoluteAssetUrl, feedAssets } from "./feedAssets";

const defaultBaseUrl = new URL("https://syndicationmanifest.org");

export const getDiscoveryDocument = (baseUrl = defaultBaseUrl) => {
  const summaryIconUrl = absoluteAssetUrl(feedAssets.summaryIconPath, baseUrl);
  const fullIconUrl = absoluteAssetUrl(feedAssets.fullIconPath, baseUrl);

  return {
    version: "https://syndicationmanifest.org/spec/0.1",
    poll_interval_seconds: 3600,
    publication: {
      name: "Syndication Manifest",
      uri: "https://syndicationmanifest.org/",
      description: "A draft specification for public syndication discovery.",
      language: "en",
      icon: summaryIconUrl,
      categories: ["specification", "syndication", "feeds", "open-web"]
    },
    feeds: [
      {
        uri: "https://syndicationmanifest.org/feed.xml",
        mime_type: "application/rss+xml",
        format_version: "2.0",
        rel: ["self", "canonical"],
        title: "Syndication Manifest Entries",
        icon_url: summaryIconUrl,
        description: "Updates about the /.well-known/syndication specification.",
        language: "en",
        categories: ["specification", "updates"],
        home_page_uri: "https://syndicationmanifest.org/entries/"
      },
      {
        uri: "https://syndicationmanifest.org/feed-full.xml",
        mime_type: "application/rss+xml",
        format_version: "2.0",
        rel: ["alternate"],
        title: "Syndication Manifest Entries: Full Content",
        icon_url: fullIconUrl,
        description: "Full-content updates about the /.well-known/syndication specification.",
        language: "en",
        categories: ["specification", "updates", "full-content"],
        home_page_uri: "https://syndicationmanifest.org/entries/"
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
