import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replit proxies dev-server requests through *.replit.dev and *.picard.replit.dev.
  // All subdomains of each entry are matched, so every Replit preview URL is covered.
  allowedDevOrigins: ["replit.dev", "picard.replit.dev", "repl.co", "replit.app"],
};

export default nextConfig;
