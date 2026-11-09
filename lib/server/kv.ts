import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { getStore } from "@netlify/blobs";

/**
 * Tiny key value layer used by the admin panel and checkout.
 *
 * On Netlify it uses Netlify Blobs, which is built into every site and needs
 * no setup. Everywhere else (local `next dev` / `next start`) it writes JSON
 * and binary files under `.data/`, so the panel works on a laptop too.
 */

export type StoreName = "catalog" | "orders" | "media";

interface StoredBinary {
  data: ArrayBuffer;
  contentType: string;
}

interface Adapter {
  getJSON<T>(key: string): Promise<T | null>;
  setJSON(key: string, value: unknown): Promise<void>;
  getBinary(key: string): Promise<StoredBinary | null>;
  setBinary(key: string, value: StoredBinary): Promise<void>;
  delete(key: string): Promise<void>;
  list(prefix?: string): Promise<string[]>;
}

/** True when running on Netlify, at build time or inside a function. */
function onNetlify(): boolean {
  return Boolean(
    process.env.NETLIFY ||
      process.env.NETLIFY_BLOBS_CONTEXT ||
      (globalThis as { netlifyBlobsContext?: unknown }).netlifyBlobsContext,
  );
}

function blobAdapter(name: StoreName): Adapter {
  // Strong consistency so the admin sees a change the moment it is saved.
  const store = getStore({ name: `xpectra-${name}`, consistency: "strong" });
  return {
    async getJSON<T>(key: string) {
      return ((await store.get(key, { type: "json" })) ?? null) as T | null;
    },
    async setJSON(key, value) {
      await store.setJSON(key, value);
    },
    async getBinary(key) {
      const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
      if (!result) return null;
      return {
        data: result.data,
        contentType: String(result.metadata?.contentType ?? "application/octet-stream"),
      };
    },
    async setBinary(key, value) {
      await store.set(key, value.data, { metadata: { contentType: value.contentType } });
    },
    async delete(key) {
      await store.delete(key);
    },
    async list(prefix) {
      const { blobs } = await store.list(prefix ? { prefix } : undefined);
      return blobs.map((blob) => blob.key);
    },
  };
}

const DATA_DIR = path.join(process.cwd(), ".data");

/** Keys may contain "/", so each one is encoded into a single file name. */
function filePath(name: StoreName, key: string, suffix = ""): string {
  return path.join(DATA_DIR, name, encodeURIComponent(key) + suffix);
}

async function readOrNull(file: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeAtomic(file: string, data: Buffer | string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temp, data);
  await fs.rename(temp, file);
}

function fileAdapter(name: StoreName): Adapter {
  return {
    async getJSON<T>(key: string) {
      const raw = await readOrNull(filePath(name, key, ".json"));
      return raw ? (JSON.parse(raw.toString("utf8")) as T) : null;
    },
    async setJSON(key, value) {
      await writeAtomic(filePath(name, key, ".json"), JSON.stringify(value));
    },
    async getBinary(key) {
      const raw = await readOrNull(filePath(name, key, ".bin"));
      if (!raw) return null;
      const type = await readOrNull(filePath(name, key, ".type"));
      return {
        data: raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength) as ArrayBuffer,
        contentType: type?.toString("utf8") || "application/octet-stream",
      };
    },
    async setBinary(key, value) {
      await writeAtomic(filePath(name, key, ".type"), value.contentType);
      await writeAtomic(filePath(name, key, ".bin"), Buffer.from(value.data));
    },
    async delete(key) {
      for (const suffix of [".json", ".bin", ".type"]) {
        await fs.rm(filePath(name, key, suffix), { force: true });
      }
    },
    async list(prefix = "") {
      let entries: string[];
      try {
        entries = await fs.readdir(path.join(DATA_DIR, name));
      } catch {
        return [];
      }
      return entries
        .filter((entry) => entry.endsWith(".json") || entry.endsWith(".bin"))
        .map((entry) => decodeURIComponent(entry.replace(/\.(json|bin)$/, "")))
        .filter((key) => key.startsWith(prefix));
    },
  };
}

/**
 * Returns the adapter for a store. The Blobs client is created per call
 * because Netlify supplies its credentials through the invocation context.
 */
export function kv(name: StoreName): Adapter {
  return onNetlify() ? blobAdapter(name) : fileAdapter(name);
}
