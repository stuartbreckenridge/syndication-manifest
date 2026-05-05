# Syndication Manifest

Status: Draft 0.1

Document: JSON object

Scope: Public syndication feeds

This draft defines a JSON syndication discovery document for public feeds, including RSS, Atom, and JSON Feed.

## Purpose

Feed readers often discover syndication feeds by parsing HTML `<head>` elements, reading HTTP `Link` headers, and guessing likely feed URLs. This specification defines a dedicated location where publishers can intentionally advertise their public syndication endpoints.

## Discovery Location

The canonical discovery URI is:

| URI | Description |
| --- | --- |
| `/.well-known/syndication` | Canonical JSON syndication discovery document. |
| `/.well-known/syndication.json` | Optional JSON alias. |

The alias MAY return the same document as the canonical URI.

The alias MAY redirect to the canonical URI.

## Document Format

The syndication discovery document MUST be a JSON object.

The document MUST describe public syndication feeds only.

Publishers SHOULD serve it with `Content-Type: application/json`.

## Members

### Top-Level Object

| Member | Required | Description |
| --- | --- | --- |
| `version` | Yes | Identifies the version of this syndication discovery format. For this draft, use `https://syndicationmanifest.org/spec/0.1`. |
| `publication` | Yes | Describes the publication or publisher responsible for the syndication document. |
| `feeds` | No | Contains feed objects for the publication as a whole. |
| `collections` | No | Contains named collections of feeds within the publication. |
| `poll_interval_seconds` | No | Advisory default minimum number of seconds between automatic fetches of listed feeds. |

A document MUST include `publication`.

A document MUST include at least one of `feeds` or `collections`.

### Publication Object

| Member | Required | Description |
| --- | --- | --- |
| `name` | Yes | Human-readable publication or publisher name. |
| `uri` | Yes | Absolute URI for the publication or publisher. |
| `description` | No | Short human-readable description. |
| `language` | No | BCP 47 language tag. |
| `icon` | No | Absolute URI for an image representing the publication. |
| `categories` | No | Array of strings containing broad descriptors for the publication. |

### Feed Object

Feed objects may appear in top-level `feeds` or inside a collection's `feeds` array.

| Member | Required | Description |
| --- | --- | --- |
| `uri` | Yes | Absolute URI for the feed. |
| `mime_type` | Yes | Media type of the feed resource. Recognised values are `application/rss+xml`, `application/atom+xml`, and `application/feed+json`. |
| `format_version` | No | Version of the feed format, when applicable. Examples include `2.0` for RSS, `1.0` for Atom, and `1.1` for JSON Feed. |
| `rel` | No | Array of relationship strings. |
| `title` | No | Human-readable feed title. |
| `icon_url` | No | Absolute URI for an image representing the feed. |
| `description` | No | Short human-readable feed description. |
| `language` | No | BCP 47 language tag. |
| `categories` | No | Publisher-declared discovery categories for presentation and selection. |
| `home_page_uri` | No | Absolute URI for the page, profile, channel, or section represented by the feed. |
| `poll_interval_seconds` | No | Advisory feed-specific minimum polling interval. Overrides the top-level value. |

Feed URIs MAY be hosted on another origin.

For `poll_interval_seconds`, clients SHOULD wait at least the specified number of seconds between automatic fetches of listed feeds.

### Collection Object

Collections let large publishers group feeds by section, product, show, channel, or other reader-facing organisation.

| Member | Required | Description |
| --- | --- | --- |
| `id` | Yes | Stable identifier for the collection within the document. |
| `title` | Yes | Human-readable collection title. |
| `icon_url` | No | Absolute URI for an image representing the collection. |
| `feeds` | No | Array of feed objects in the collection. |
| `feeds_uri` | No | Absolute URI for a JSON syndication document containing the collection's feeds, child collections, or both. |
| `feed_count` | No | Advisory number of feeds in the collection. |
| `uri` | No | Absolute URI for the collection's home page, section, product, show, or channel. |
| `description` | No | Short human-readable collection description. |
| `language` | No | BCP 47 language tag. |
| `categories` | No | Array of strings containing broad descriptors for the collection. |

If `collections` is present, each collection MUST include `id` and `title`.

Each collection MUST include at least one of `feeds` or `feeds_uri`.

Collection `id` values MUST be unique within the document.

A collection MAY include both `feeds` and `feeds_uri`.

If `feeds_uri` is present, clients MAY fetch it to retrieve the collection's feeds, child collections, or both.

Clients MAY use collections to organise feed choices.

Collections MAY form a hierarchy across documents. For example, a `Sport` collection MAY link to a document containing a `Football` collection, which MAY link to a document containing regional or team-level collections and feeds.

## Relations

`rel` is an optional array of strings. Recognised values for this draft are `self`, `canonical`, and `alternate`.

| Relation | Description |
| --- | --- |
| `self` | This feed is the publisher's primary advertised feed for the publication or section described by the feed object. |
| `canonical` | This feed is the preferred stable URI clients should store for subscription, deduplication, and comparison. |
| `alternate` | This feed is an alternate feed representation or additional feed the publisher wants to advertise. |

If `rel` is omitted, clients MUST treat it as `["alternate"]`.

## Authority And Origin

A syndication document represents the publication's claim about the feeds it wishes to advertise. Listing an external feed is a statement by the publication, not proof that the publication controls the external feed.

A syndication document MAY list feeds hosted on other origins.

Clients MUST NOT assume that an off-origin feed is controlled by the origin serving the syndication document.

Clients SHOULD display feed metadata and source origins clearly when presenting discovered feeds.

## Client Behaviour

Clients SHOULD request `/.well-known/syndication` first.

Clients MAY request `/.well-known/syndication.json` if the canonical URI is unavailable.

If no valid syndication document is found, clients MAY fall back to HTML `<head>` discovery, HTTP `Link` headers, or other legacy discovery methods.

If a valid syndication document is available, clients MUST treat it as authoritative for the publication's advertised feeds.

Clients MUST ignore unknown members.

Clients SHOULD NOT reject a valid document because it contains unknown categories or extension members.

Clients MUST process top-level `feeds` and inline collection feeds.

Clients MUST NOT be required to fetch every `feeds_uri` before presenting top-level collections.

Clients MAY use discovery metadata to present feed choices before fetching the listed feeds.

Clients MAY fetch a collection's `feeds_uri` in response to user action or when the client needs the full collection.

Clients SHOULD avoid unbounded recursive fetching of collection documents.

Clients SHOULD detect and stop collection traversal loops.

Clients SHOULD NOT assume discovery metadata is a complete representation of the feed resource.

## Publisher Behaviour

`poll_interval_seconds` is advisory.

Publishers SHOULD use absolute URIs for all URI values.

Publishers SHOULD keep the syndication document small.

Publishers SHOULD update the document when feeds or collections are added, removed, relocated, or replaced.

Clients MAY fetch less frequently than `poll_interval_seconds`.

Clients MAY fetch sooner in response to explicit user action.

Clients SHOULD still use HTTP caching and conditional requests when fetching feeds.

## Security And Privacy

Syndication discovery documents are public metadata.

Publishers MUST NOT list private, secret, or user-specific feed URLs.

Clients SHOULD apply usual HTTP redirect, caching, and content validation rules.

Clients MAY apply additional verification, reputation, or user-confirmation checks before subscribing to off-origin feeds.

## Examples

### Simple Site

```json
{
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "Example Publication",
    "uri": "https://example.com/"
  },
  "feeds": [
    {
      "uri": "https://example.com/feed.xml",
      "mime_type": "application/rss+xml",
      "rel": ["self", "canonical"],
      "title": "All posts",
      "icon_url": "https://example.com/icons/feed.png"
    }
  ]
}
```

### Site With Collections

```json
{
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "Example Media",
    "uri": "https://example.com/",
    "language": "en"
  },
  "collections": [
    {
      "id": "news",
      "title": "News",
      "uri": "https://example.com/news/",
      "icon_url": "https://example.com/icons/news.png",
      "description": "Public feeds from the news desk.",
      "feed_count": 24,
      "feeds_uri": "https://example.com/.well-known/syndication/news"
    },
    {
      "id": "sport",
      "title": "Sport",
      "uri": "https://example.com/sport/",
      "icon_url": "https://example.com/icons/sport.png",
      "description": "Public feeds from the sport desk.",
      "feed_count": 12,
      "feeds_uri": "https://example.com/.well-known/syndication/sport"
    }
  ]
}
```

### Nested Collection Document

This example could be returned by `https://example.com/.well-known/syndication/sport/football` after a client follows a parent collection's `feeds_uri`.

```json
{
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "Example Sport",
    "uri": "https://example.com/sport/",
    "language": "en"
  },
  "collections": [
    {
      "id": "scotland",
      "title": "Scottish football",
      "uri": "https://example.com/sport/football/scotland/",
      "icon_url": "https://example.com/icons/scotland-football.png",
      "description": "Scottish football team feeds.",
      "feeds_uri": "https://example.com/.well-known/syndication/sport/football/scotland"
    }
  ],
  "feeds": [
    {
      "uri": "https://example.com/sport/football/rss.xml",
      "mime_type": "application/rss+xml",
      "title": "Football",
      "categories": ["sport", "football"]
    }
  ]
}
```

This example could be returned by `https://example.com/.well-known/syndication/sport/football/scotland`.

```json
{
  "version": "https://syndicationmanifest.org/spec/0.1",
  "publication": {
    "name": "Example Sport",
    "uri": "https://example.com/sport/",
    "language": "en"
  },
  "feeds": [
    {
      "uri": "https://example.com/sport/football/scotland/caledonia-city.xml",
      "mime_type": "application/rss+xml",
      "title": "Caledonia City",
      "categories": ["sport", "football", "scotland"]
    },
    {
      "uri": "https://example.com/sport/football/scotland/northbank-united.xml",
      "mime_type": "application/rss+xml",
      "title": "Northbank United",
      "categories": ["sport", "football", "scotland"]
    }
  ]
}
```
