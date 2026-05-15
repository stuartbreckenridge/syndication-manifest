export const daringFireballExample = {
  "version": "0.1",
  "publication": {
    "name": "Daring Fireball",
    "uri": "https://daringfireball.net/",
    "description": "Example syndication document for Daring Fireball feeds.",
    "language": "en",
    "categories": [
      "technology",
      "blog",
      "podcast",
      "video"
    ]
  },
  "feeds": [
    {
      "uri": "https://daringfireball.net/feeds/main",
      "mime_type": "application/atom+xml",
      "format_version": "1.0",
      "rel": [
        "primary",
        "subscribe"
      ],
      "title": "Daring Fireball",
      "description": "Main feed for everything on Daring Fireball.",
      "language": "en",
      "categories": [
        "technology",
        "blog"
      ],
      "home_page_uri": "https://daringfireball.net/"
    },
    {
      "uri": "https://daringfireball.net/feeds/json",
      "mime_type": "application/feed+json",
      "format_version": "1.1",
      "rel": [
        "alternate"
      ],
      "title": "Daring Fireball JSON Feed",
      "description": "JSON Feed version of the main Daring Fireball feed.",
      "language": "en",
      "categories": [
        "technology",
        "blog"
      ],
      "home_page_uri": "https://daringfireball.net/"
    },
    {
      "uri": "https://daringfireball.net/feeds/articles",
      "mime_type": "application/atom+xml",
      "format_version": "1.0",
      "rel": [
        "alternate"
      ],
      "title": "Daring Fireball Articles",
      "description": "Articles-only feed.",
      "language": "en",
      "categories": [
        "technology",
        "blog",
        "articles"
      ],
      "home_page_uri": "https://daringfireball.net/"
    },
    {
      "uri": "https://daringfireball.net/thetalkshow/rss",
      "mime_type": "application/rss+xml",
      "format_version": "2.0",
      "rel": [
        "alternate"
      ],
      "title": "The Talk Show With John Gruber",
      "description": "Podcast feed for The Talk Show.",
      "language": "en",
      "categories": [
        "podcast",
        "technology"
      ],
      "home_page_uri": "https://daringfireball.net/thetalkshow/"
    },
    {
      "uri": "https://www.youtube.com/feeds/videos.xml?channel_id=UC5IxPw1YtEZLvwicHpbg4Wg",
      "mime_type": "application/atom+xml",
      "format_version": "1.0",
      "rel": [
        "alternate"
      ],
      "title": "Daring Fireball on YouTube",
      "description": "External video feed for the Daring Fireball YouTube channel.",
      "language": "en",
      "categories": [
        "video",
        "technology"
      ],
      "home_page_uri": "https://www.youtube.com/daringfireball"
    }
  ]
};
