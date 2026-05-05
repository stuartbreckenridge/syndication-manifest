export const bbcSportFeedsExample = {
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "BBC Sport",
    "uri": "https://www.bbc.co.uk/sport/",
    "description": "Example deferred collection document for BBC Sport feeds.",
    "language": "en-GB",
    "categories": [
      "sport"
    ]
  },
  "collections": [
    {
      "id": "football",
      "title": "Football",
      "uri": "https://www.bbc.co.uk/sport/football/",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/sport/bbc-sport-logo.0da9386782.png",
      "description": "Football feeds and child collections from BBC Sport.",
      "language": "en-GB",
      "categories": [
        "sport",
        "football"
      ],
      "feeds_uri": "https://www.bbc.co.uk/.well-known/syndication/sport/football"
    }
  ],
  "feeds": [
    {
      "uri": "https://feeds.bbci.co.uk/sport/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "rel": [
        "self",
        "canonical"
      ],
      "title": "Top Stories",
      "icon_url": "https://static.files.bbci.co.uk/core/website/assets/static/sport/bbc-sport-logo.0da9386782.png",
      "language": "en-GB",
      "categories": [
        "sport"
      ],
      "home_page_uri": "https://www.bbc.co.uk/sport/"
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/football/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Football",
      "language": "en-GB",
      "categories": [
        "sport",
        "football"
      ]
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/cricket/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Cricket",
      "language": "en-GB",
      "categories": [
        "sport",
        "cricket"
      ]
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/formula1/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Formula 1",
      "language": "en-GB",
      "categories": [
        "sport",
        "formula-1"
      ]
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/rugby-union/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Rugby Union",
      "language": "en-GB",
      "categories": [
        "sport",
        "rugby-union"
      ]
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/tennis/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Tennis",
      "language": "en-GB",
      "categories": [
        "sport",
        "tennis"
      ]
    },
    {
      "uri": "https://feeds.bbci.co.uk/sport/golf/rss.xml",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "title": "Golf",
      "language": "en-GB",
      "categories": [
        "sport",
        "golf"
      ]
    }
  ]
};
