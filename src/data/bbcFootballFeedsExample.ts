export const bbcFootballFeedsExample = {
  "version": "0.1",
  "publication": {
    "name": "BBC Sport Football",
    "uri": "https://www.bbc.co.uk/sport/football/",
    "description": "Example deferred collection document for BBC Sport football feeds.",
    "language": "en-GB",
    "categories": [
      "sport",
      "football"
    ]
  },
  "collections": [
    {
      "id": "scotland",
      "title": "Scottish Football",
      "uri": "https://www.bbc.co.uk/sport/football/scottish/",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/sport/bbc-sport-logo.0da9386782.png",
      "description": "Scottish football feeds and child collections from BBC Sport.",
      "language": "en-GB",
      "categories": [
        "sport",
        "football",
        "scotland"
      ],
      "feeds_uri": "https://www.bbc.co.uk/.well-known/syndication/sport/football/scotland"
    }
  ],
  "feeds": [
    {
      "uri": "https://feeds.bbci.co.uk/sport/football/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "rel": [
        "primary",
        "subscribe"
      ],
      "title": "Football",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/sport/bbc-sport-logo.0da9386782.png",
      "language": "en-GB",
      "categories": [
        "sport",
        "football"
      ],
      "home_page_uri": "https://www.bbc.co.uk/sport/football/"
    }
  ]
};
