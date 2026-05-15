# Syndication Manifest

Predictable discovery for public feeds.

This repository contains the public website and draft specification for Syndication Manifest, a JSON discovery document served from `/.well-known/syndication`. The goal is to let feed readers make one predictable request, receive the publisher's declared RSS, Atom, and JSON Feed endpoints, and avoid full-site crawling, HTML scraping, and URL guessing.

The current specification status is Draft 0.1.

## Project Structure

- `SPEC.md` - Platform-neutral source of the draft specification. The rendered spec page at `/spec/0.1/` derives from this file.
- `public/spec/0.1/schema.json` - JSON Schema for the 0.1 document format.
- `src/pages/` - Astro pages: home, spec, examples, validator, publisher guide, comparison, implementations, entries, and the `/.well-known/syndication` endpoint.
- `src/components/` - Reusable Astro components for examples and JSON displays.
- `src/data/` - Discovery document and example manifest data.
- `src/styles/global.css` - Site-wide styles.
- `public/_headers` - HTTP headers for static assets (CORS, cache, content-type for the discovery endpoint and schema).
- `public/_redirects` - Redirects for legacy paths.
- `wrangler.jsonc` - Cloudflare Workers static asset deployment configuration.

## Development

Install dependencies:

```sh
npm ci
```

Start the local development server:

```sh
npm run dev
```

Build the site:

```sh
npm run build
```

Preview the built site locally:

```sh
npm run preview
```

Preview the Cloudflare Workers deployment locally:

```sh
npm run preview:worker
```

Deploy with Wrangler:

```sh
npm run deploy
```

## Specification Work

The platform-neutral draft specification lives in [SPEC.md](SPEC.md). The rendered website copy lives at `src/pages/spec/0.1.astro`.

Changes to the specification should preserve the meaning of existing normative language unless the draft version is intentionally being revised.

When adding examples, make clear whether they are publisher-authored examples or illustrative translations of public feed data.

## License

This project is dedicated to the public domain under CC0-1.0. See [LICENSE.md](LICENSE.md).

If this specification is submitted to the IETF, that submission will also be
subject to BCP 78, BCP 79, and the IETF Trust Legal Provisions in effect at the
time of submission or publication.
