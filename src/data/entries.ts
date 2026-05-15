import type { CollectionEntry } from "astro:content";

type Entry = CollectionEntry<"entries">;

export const isPublishedEntry = (entry: Entry) => entry.data.draft !== true;

export const sortEntriesNewestFirst = (entries: Entry[]) =>
  [...entries].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
