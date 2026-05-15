---
title: Syndication Manifest
status: Draft
version: "0.1"
document: JSON object
scope: Public syndication feeds
summary: This draft defines a JSON syndication discovery document for public feeds, including RSS, Atom, and JSON Feed.
---

## Purpose

Feed readers often discover syndication feeds by parsing HTML `<head>` elements, reading HTTP `Link` headers, and guessing likely feed URLs. This specification defines a dedicated location where publishers can intentionally advertise their public syndication endpoints.

## Conventions

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) when, and only when, they appear in capital letters.

## Discovery Location

The canonical discovery URI is:

| URI | Description |
| --- | --- |
| `/.well-known/syndication` | Canonical JSON syndication discovery document. |
| `/.well-known/syndication.json` | Optional JSON alias. |

The alias MAY return the same document as the canonical URI.

The alias MAY redirect to the canonical URI.

Publishers MAY also advertise the discovery document from any HTML page by emitting an HTML element:

```html
<link rel="syndication" href="/.well-known/syndication" type="application/syndication+json">
```

Publishers MAY advertise the discovery document with an HTTP `Link` header:

```
Link: </.well-known/syndication>; rel="syndication"; type="application/syndication+json"
```

The HTML and HTTP advertisements are conveniences for legacy discovery. Clients MUST still treat `/.well-known/syndication` itself as the canonical location.

## Document Format

The syndication discovery document MUST be a JSON object.

The document MUST describe public syndication feeds only.

Publishers SHOULD serve it with `Content-Type: application/syndication+json`. Publishers MAY serve it with `Content-Type: application/json` while implementations transition. Clients MUST accept both content types.

The recommended JSON Schema for this draft is published at `https://syndicationmanifest.org/spec/0.1/schema.json`. The schema is non-normative; this document takes precedence on any conflict.

## Members

### Top-Level Object

| Member | Required | Description |
| --- | --- | --- |
| `version` | Yes | String identifying the syndication discovery format version. For this draft, use `"0.1"`. |
| `publication` | Yes | Object describing the publication or publisher responsible for the syndication document. |
| `feeds` | No | Array of feed objects for the publication as a whole. |
| `collections` | No | Array of named collections of feeds within the publication. |
| `spec_uri` | No | Absolute URI for the specification this document targets. |
| `self_uri` | No | Absolute URI for this syndication document. |
| `updated` | No | RFC 3339 timestamp indicating when the document was last modified. |
| `contact` | No | Contact object describing how reader operators can reach the publisher. |
| `poll_interval_seconds` | No | Advisory default minimum number of seconds between automatic fetches of listed feeds. |
| `extensions` | No | Object containing namespaced extension members. |

A document MUST include `publication`.

A document MUST include at least one of `feeds` or `collections`.

Clients SHOULD use `updated` to short-circuit refresh when paired with HTTP conditional requests.

### Publication Object

| Member | Required | Description |
| --- | --- | --- |
| `name` | Yes | Human-readable publication or publisher name. |
| `uri` | Yes | Absolute URI for the publication or publisher. |
| `description` | No | Short human-readable description. |
| `language` | No | BCP 47 language tag. |
| `icon` | No | Absolute URI for an image representing the publication. |
| `categories` | No | Array of strings containing broad descriptors for the publication. |
| `translations` | No | Translations object. |

### Feed Object

Feed objects may appear in top-level `feeds` or inside a collection's `feeds` array.

| Member | Required | Description |
| --- | --- | --- |
| `uri` | Yes | Absolute URI for the feed. |
| `mime_type` | Yes | Media type of the feed resource. Recognised values are `application/rss+xml`, `application/atom+xml`, and `application/feed+json`. |
| `id` | No | Stable opaque identifier for the feed. URI, URN, or UUID forms are recommended. Helps clients keep subscriptions across feed URL changes. |
| `format_version` | No | Version of the feed format, when applicable. Examples include `2.0` for RSS, `1.0` for Atom, and `1.1` for JSON Feed. |
| `rel` | No | Array of relationship strings. |
| `title` | No | Human-readable feed title. |
| `icon_url` | No | Absolute URI for an image representing the feed. |
| `description` | No | Short human-readable feed description. |
| `language` | No | BCP 47 language tag. |
| `categories` | No | Publisher-declared discovery categories for presentation and selection. |
| `home_page_uri` | No | Absolute URI for the page, profile, channel, or section represented by the feed. |
| `poll_interval_seconds` | No | Advisory feed-specific minimum polling interval. Overrides the top-level value. |
| `translations` | No | Translations object. |

Feed URIs MAY be hosted on another origin.

For `poll_interval_seconds`, clients SHOULD wait at least the specified number of seconds between automatic fetches of listed feeds.

A `mime_type` value outside the recognised list is permitted. Clients MAY ignore feeds whose `mime_type` they do not understand. Podcast feeds typically use `application/rss+xml`.

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
| `translations` | No | Translations object. |

If `collections` is present, each collection MUST include `id` and `title`.

Each collection MUST include at least one of `feeds` or `feeds_uri`.

Collection `id` values MUST be unique within the document.

A collection MAY include both `feeds` and `feeds_uri`.

If `feeds_uri` is present, clients MAY fetch it to retrieve the collection's feeds, child collections, or both.

Clients MAY use collections to organise feed choices.

Collections MAY form a hierarchy across documents. For example, a `Sport` collection MAY link to a document containing a `Football` collection, which MAY link to a document containing regional or team-level collections and feeds.

### Contact Object

| Member | Required | Description |
| --- | --- | --- |
| `name` | No | Human-readable contact name. |
| `uri` | No | Absolute URI for a contact page, profile, or fediverse handle. |
| `email` | No | Email address. |

A contact object MUST include at least one member.

### Translations Object

Publication, feed, and collection objects MAY include a `translations` member to advertise the same human-readable strings in additional languages.

`translations` is an object keyed by BCP 47 language tag. Each value is an object containing one or more of `name`, `title`, `description`. The set of permitted keys matches the human-readable members of the parent object.

The parent object's top-level `name`/`title`/`description` strings are the canonical fallback. Clients SHOULD prefer the translation whose tag best matches the user's locale and fall back to the parent strings when no match is available.

```json
{
  "name": "Example Media",
  "language": "en",
  "translations": {
    "fr": { "name": "Exemple Média" },
    "ja": { "name": "サンプルメディア" }
  }
}
```

## Relations

`rel` is an optional array of strings. Recognised values for this draft are `primary`, `subscribe`, and `alternate`.

| Relation | Description |
| --- | --- |
| `primary` | This feed is the publisher's primary advertised feed for the publication or section described by the feed object. |
| `subscribe` | This feed is the preferred stable URI clients should store for subscription, deduplication, and comparison. |
| `alternate` | This feed is an alternate feed representation or additional feed the publisher wants to advertise. |

If `rel` is omitted, clients MUST treat it as `["alternate"]`.

Clients MUST treat unknown `rel` values as `alternate`.

Earlier 0.1 drafts used `self` in place of `primary` and `canonical` in place of `subscribe`. Clients MAY accept the older values as aliases. Publishers SHOULD emit the new values.

## HTTP Behaviour

This section governs how syndication documents are served and fetched.

### CORS

Publishers SHOULD respond to `GET` requests for `/.well-known/syndication` and `/.well-known/syndication.json` with `Access-Control-Allow-Origin: *`. Without it, browser-based feed readers cannot perform cross-origin discovery.

Publishers SHOULD also expose the headers `Content-Type`, `ETag`, and `Last-Modified` via `Access-Control-Expose-Headers`.

### Caching

Publishers SHOULD send `Cache-Control` directives that match the document's own `poll_interval_seconds`, when present.

Publishers SHOULD support `ETag` and `Last-Modified` and respond to conditional `If-None-Match` and `If-Modified-Since` requests with `304 Not Modified` when the document is unchanged.

Clients SHOULD respect cache headers and use conditional requests on subsequent fetches.

### Transport

Publishers SHOULD serve syndication documents over HTTPS.

Clients MAY refuse to process syndication documents served over plain HTTP.

### Redirects

Clients MUST follow up to five HTTP redirects when fetching a syndication document. Clients SHOULD stop after that to limit traversal cost.

Clients SHOULD treat the final URL after redirects as the effective origin of the document.

### Status Codes

A `404` response means the document is absent. Clients MAY then fall back to legacy discovery.

A `2xx` response with a body that is not a JSON object, or that lacks required members, is malformed. Clients MUST treat malformed documents as absent for the purposes of discovery.

Clients SHOULD NOT retry malformed documents more often than the listed `poll_interval_seconds` or one hour, whichever is greater.

### Document Size

Publishers SHOULD keep a single syndication document below 256 KB. Larger publications SHOULD use collections and `feeds_uri` deferral rather than a single large document.

Clients MAY refuse to process documents larger than 1 MB.

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

### Collection Traversal

Clients SHOULD limit collection traversal to a maximum depth of eight documents.

Clients SHOULD record visited `feeds_uri` URLs and skip any URL they have already fetched during the current traversal.

Clients SHOULD detect and stop on traversal loops.

Clients SHOULD NOT assume discovery metadata is a complete representation of the feed resource.

### Version Handling

Clients MUST process documents whose `version` matches a known major and minor.

Clients MUST treat documents whose `version` differs only in minor from a known version as best-effort compatible; ignore unknown members and proceed.

Clients SHOULD warn or refuse when the `version` major differs from any known version.

## Publisher Behaviour

`poll_interval_seconds` is advisory.

Publishers SHOULD use absolute URIs for all URI values.

Publishers SHOULD keep the syndication document small.

Publishers SHOULD update the document when feeds or collections are added, removed, relocated, or replaced.

Publishers SHOULD update `updated` when the document changes.

Publishers SHOULD NOT nest collections more than three levels deep for human-facing discovery.

Clients MAY fetch less frequently than `poll_interval_seconds`.

Clients MAY fetch sooner in response to explicit user action.

Clients SHOULD still use HTTP caching and conditional requests when fetching feeds.

## Extensions

This specification reserves all bare member names for current and future use. Publishers MUST NOT introduce vendor or experimental members with bare names.

Vendor extensions MUST use one of:

- A reverse-DNS prefix, for example `com.example.podcast_seasons`.
- A URI as the member name.

Vendor extensions SHOULD live inside the optional top-level `extensions` object to make them easy to locate. Vendor extensions MAY appear inline on publication, feed, or collection objects when they describe that specific object.

Clients MUST ignore vendor extensions they do not understand.

## Security And Privacy

Syndication discovery documents are public metadata.

Publishers MUST NOT list private, secret, or user-specific feed URLs.

Clients SHOULD apply usual HTTP redirect, caching, and content validation rules.

Clients MAY apply additional verification, reputation, or user-confirmation checks before subscribing to off-origin feeds.

Clients SHOULD validate that the document is a JSON object before processing any member.

Clients SHOULD enforce a maximum document size and a maximum depth of nested collection documents.

## IANA Considerations

This draft asks that the following media type be registered:

- Type name: `application`
- Subtype name: `syndication+json`
- Required parameters: none
- Optional parameters: none
- Encoding considerations: binary (JSON is UTF-8)
- Security considerations: see Security And Privacy
- Interoperability considerations: see HTTP Behaviour
- Published specification: this document

This draft asks that the following well-known URI be registered, per [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615):

- URI suffix: `syndication`
- Change controller: editor of this specification
- Specification document: this document
- Related information: none

This draft asks that the following link relation be registered, per [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288):

- Relation name: `syndication`
- Description: Refers to the publisher's syndication discovery document.
- Reference: this document

## Examples

### Simple Site

```json
{
  "version": "0.1",
  "publication": {
    "name": "Example Publication",
    "uri": "https://example.com/"
  },
  "feeds": [
    {
      "uri": "https://example.com/feed.xml",
      "mime_type": "application/rss+xml",
      "rel": ["primary", "subscribe"],
      "title": "All posts",
      "icon_url": "https://example.com/icons/feed.png"
    }
  ]
}
```

### Site With Collections

```json
{
  "version": "0.1",
  "self_uri": "https://example.com/.well-known/syndication",
  "updated": "2026-05-16T09:30:00Z",
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
  "version": "0.1",
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
  "version": "0.1",
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
