import { getDiscoveryDocument } from "../../data/discovery";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const discoveryDocument = getDiscoveryDocument(site ?? new URL("https://syndicationmanifest.org"));

  return new Response(JSON.stringify(discoveryDocument, null, 2) + "\n", {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
