import type { NextConfig } from "next";

// Derive the WordPress image host from the same env var the app uses, so the
// allowlist can never drift from the backend it actually talks to.
const WP_HOSTNAME = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WP_BASE_URL || "").hostname;
  } catch {
    return "";
  }
})();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["dotted-map"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(WP_HOSTNAME
        ? [{ protocol: "https" as const, hostname: WP_HOSTNAME }]
        : []),
    ],
  },
};

export default nextConfig;
