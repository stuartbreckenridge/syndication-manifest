# Syndication Manifest

Predictable discovery for public feeds.

This repository contains the public website and draft specification for Syndication Manifest, a JSON discovery document served from `/.well-known/syndication`. The goal is to let feed readers make one predictable request, receive the publisher's declared RSS, Atom, and JSON Feed endpoints, and avoid full-site crawling, HTML scraping, and URL guessing.

The current specification status is Draft 0.1.

## Project Structure

- `src/pages/` - Astro pages for the home page, examples, and versioned specification.
- `src/components/` - Reusable Astro components for examples and JSON displays.
- `src/data/` - Example manifest data used by the examples page.
- `src/styles/global.css` - Site-wide styles.
- `public/` - Static assets and deployment headers.
- `wrangler.jsonc` - Cloudflare Workers static asset deployment configuration.
- `SPEC.md` - Platform-neutral copy of the draft specification.

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
