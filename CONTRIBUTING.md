# Contributing

Thanks for helping improve Syndication Manifest.

This project is both a small Astro site and a draft specification for feed discovery at `/.well-known/syndication`. Contributions should keep both audiences in mind: people reading the spec and developers implementing it in publishers or feed readers.

## Local Setup

Install dependencies:

```sh
npm ci
```

Run the development server:

```sh
npm run dev
```

Before opening a pull request, build the site:

```sh
npm run build
```

## Contribution Guidelines

- Keep the specification precise. Use RFC-style keywords such as `MUST`, `SHOULD`, and `MAY` only when the requirement is intentional.
- Keep examples realistic and clearly sourced. If an example is not endorsed by the named publisher, say so near the example.
- Prefer small, focused changes. Specification edits, copy changes, examples, and styling updates are easier to review when separated.
- Use the latest stable package and framework versions when adding or updating dependencies.
- Avoid packages that are deprecated or near end-of-life.
- Follow the existing Astro component and styling patterns.
- Use plain, direct prose. Avoid heavy punctuation where a shorter sentence would be clearer.

## Draft Specification Changes

Make normative specification edits in `SPEC.md`. The rendered page at `/spec/0.1/` derives from `SPEC.md` directly, so there is no separate copy to keep in sync. Update affected examples in `src/data/` when the wire format changes.

If a change alters the JSON shape, update `public/spec/0.1/schema.json` so the validator and external tooling stay aligned.

For changes that alter the wire format or client/publisher behavior, include:

- The motivation for the change.
- The affected members or processing rules.
- Any compatibility impact for existing draft `0.1` examples.
- Updated examples when the behavior is visible in JSON.

## Pull Request Checklist

- `npm run build` completes successfully.
- New or changed examples render correctly.
- Spec changes update related examples, comparison text, or README notes where relevant.
- The change does not introduce unnecessary dependencies.

## License

By contributing, you agree that your contributions will be dedicated to the public domain under CC0-1.0.
