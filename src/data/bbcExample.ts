export const bbcExample = {
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "BBC",
    "uri": "https://www.bbc.co.uk/",
    "description": "Example syndication document for BBC public feeds.",
    "language": "en-GB",
    "categories": [
      "news",
      "sport"
    ]
  },
  "collections": [
    {
      "id": "news",
      "title": "BBC News",
      "uri": "https://www.bbc.co.uk/news/",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/icons/touch/news/touch-icon-36.413a37b22764b74a2793.png",
      "description": "Public RSS feeds advertised by BBC News.",
      "language": "en-GB",
      "categories": [
        "news"
      ],
      "feed_count": 39,
      "feeds_uri": "https://www.bbc.co.uk/.well-known/syndication/news"
    },
    {
      "id": "sport",
      "title": "BBC Sport",
      "uri": "https://www.bbc.co.uk/sport/",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/sport/bbc-sport-logo.0da9386782.png",
      "description": "Representative public RSS feeds from BBC Sport.",
      "language": "en-GB",
      "categories": [
        "sport"
      ],
      "feed_count": 7,
      "feeds_uri": "https://www.bbc.co.uk/.well-known/syndication/sport"
    }
  ]
};
