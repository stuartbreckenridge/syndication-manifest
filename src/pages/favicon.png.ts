import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const image = await readFile(join(cwd(), "src/content/images/Manifest.png"));

  return new Response(image, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png"
    }
  });
};
