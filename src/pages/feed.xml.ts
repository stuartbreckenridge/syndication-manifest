import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { isPublishedEntry, sortEntriesNewestFirst } from "../data/entries";
import { absoluteAssetUrl, feedAssets } from "../data/feedAssets";

const escapeXml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://syndicationmanifest.org");
  const summaryIconUrl = absoluteAssetUrl(feedAssets.summaryIconPath, baseUrl);
  const entries = sortEntriesNewestFirst(
    (await getCollection("entries")).filter(isPublishedEntry)
  );
  const latestDate = entries[0]?.data.updatedDate ?? entries[0]?.data.pubDate ?? new Date();

  const items = entries.map((entry) => {
    const href = new URL(`/entries/${entry.id}/`, baseUrl).toString();

    return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${escapeXml(href)}</link>
      <guid isPermaLink="false">${escapeXml(entry.data.guid)}</guid>
      <pubDate>${entry.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(entry.data.description)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Syndication Manifest Entries</title>
    <link>${escapeXml(new URL("/", baseUrl).toString())}</link>
    <atom:link href="${escapeXml(new URL("/feed.xml", baseUrl).toString())}" rel="self" type="application/rss+xml" />
    <description>Updates about the /.well-known/syndication specification.</description>
    <language>en</language>
    <image>
      <url>${escapeXml(summaryIconUrl)}</url>
      <title>Syndication Manifest Entries</title>
      <link>${escapeXml(new URL("/", baseUrl).toString())}</link>
      <width>194</width>
      <height>194</height>
    </image>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
