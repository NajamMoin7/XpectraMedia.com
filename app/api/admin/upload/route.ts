import { isAdmin } from "@/lib/server/auth";
import { kv } from "@/lib/server/kv";

/** Uploads one product photo and returns the URL to store on the product. */

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ ok: false, message: "Not signed in." }, { status: 401 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return Response.json({ ok: false, message: "No file received." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ ok: false, message: "No file received." }, { status: 400 });
  }

  const extension = TYPES[file.type];
  if (!extension) {
    return Response.json({ ok: false, message: "Please upload a JPG, PNG or WEBP image." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ ok: false, message: "Please upload an image under 4 MB." }, { status: 400 });
  }

  const key = `products/${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  await kv("media").setBinary(key, { data: await file.arrayBuffer(), contentType: file.type });

  return Response.json({ ok: true, url: `/media/${key}` });
}
