---
title: "Introducing Syndication Manifest"
guid: "xO3tV2ThWXadeEiY2QvWE"
description: "A short note on why this draft exists and what it gives feed readers."
pubDate: 2026-05-12
draft: true
---

Syndication Manifest starts with a small problem: feed readers should not need to guess where a publisher keeps its public feeds.

HTML feed autodiscovery is useful, but it is tied to the page a reader has already fetched. It does not give a publication-level view of every public feed, nor does it describe collections such as sections, shows, products, or external channels in a compact way.

The draft defines one predictable JSON document at `/.well-known/syndication`. A reader can request that document first, inspect the publisher-declared feeds and collections, then decide whether it needs to fall back to older discovery methods.

This site will use Entries for updates about the draft, implementation notes, and examples from feed readers and publishers.
