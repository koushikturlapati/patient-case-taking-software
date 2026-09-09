import type { NextConfig } from "next";

/**
 * The kiosk deploys as a fully static site to GitHub Pages, which serves the
 * repository from a subpath. `BASE_PATH` is supplied by the deploy workflow;
 * locally it stays empty so `next dev` runs at the root.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages has no rewrite layer, so directory-style URLs need real index.html files.
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Kiosks and phones on the clinic LAN reach `next dev` by IP rather than by
  // hostname; without this the dev server blocks its own HMR assets and the
  // page renders but never hydrates.
  allowedDevOrigins: ["127.0.0.1", "localhost", "172.16.0.2"],
};

export default nextConfig;
