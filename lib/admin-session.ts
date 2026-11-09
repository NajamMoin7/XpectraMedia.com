/**
 * Signed admin session cookie, shared by proxy.ts and the server code.
 *
 * The cookie holds an expiry time and an HMAC of it. Nothing secret is stored
 * in the browser, and changing ADMIN_PASSWORD signs every admin out.
 * Uses Web Crypto only, so it runs anywhere Next.js does.
 */

export const ADMIN_COOKIE = "xm_admin";
export const SESSION_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** The signing secret. A dedicated value is preferred, the password works too. */
function sessionSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return process.env.ADMIN_SESSION_SECRET || `xm-admin:${process.env.ADMIN_USERNAME ?? ""}:${password}`;
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
}

/** Constant time comparison of two strings of hex or plain text. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${await hmac(secret, expires)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, await hmac(secret, expires));
}

/** Compares the submitted login against ADMIN_USERNAME and ADMIN_PASSWORD. */
export async function checkCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return false;
  // Hashing both sides first keeps the comparison constant time for any length.
  const salt = "xm-login";
  const [a, b, c, d] = await Promise.all([
    hmac(salt, username),
    hmac(salt, expectedUser),
    hmac(salt, password),
    hmac(salt, expectedPassword),
  ]);
  return safeEqual(a, b) && safeEqual(c, d);
}
