import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Content and OG fonts are read from disk at build/render time.
  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*", "./assets/fonts/**/*"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
