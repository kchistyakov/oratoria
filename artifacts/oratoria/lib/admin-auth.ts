export const COOKIE_NAME = "ora_panel";
const DATA = "oratoria-admin-v1";

async function computeToken(): Promise<string> {
  const secret =
    process.env.ADMIN_SECRET ?? "dev-secret-change-in-production";
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    keyMaterial,
    encoder.encode(DATA)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySession(token: string): Promise<boolean> {
  const expected = await computeToken();
  return token === expected;
}

export { computeToken };
