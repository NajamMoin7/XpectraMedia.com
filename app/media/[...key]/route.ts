import { isAdmin } from "@/lib/server/auth";
import { kv } from "@/lib/server/kv";

/**
 * Serves files uploaded through the admin panel and saved with orders.
 *
 *   /media/products/...  product photos, public and cached
 *   /media/artwork/...   customer artwork from custom shirt orders, admin only
 */

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key: parts } = await params;
  const key = parts.join("/");
  const [folder] = parts;

  if (folder !== "products" && folder !== "artwork") {
    return new Response("Not found", { status: 404 });
  }
  if (folder === "artwork" && !(await isAdmin())) {
    return new Response("Not found", { status: 404 });
  }

  const file = await kv("media").getBinary(key);
  if (!file) return new Response("Not found", { status: 404 });

  return new Response(file.data, {
    headers: {
      "Content-Type": file.contentType,
      "X-Content-Type-Options": "nosniff",
      // Product photo keys are unique per upload, so they never change.
      "Cache-Control":
        folder === "products" ? "public, max-age=31536000, immutable" : "private, no-store",
    },
  });
}
