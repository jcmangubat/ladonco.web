import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import sitemap from "vite-plugin-sitemap";
import { getServiceOfferings } from "./src/data/service-offerings";

// Helper: load slugs from blogs-catalog.json
function getBlogRoutes() {
  const catalogPath = path.resolve(
    __dirname,
    "public/contents/posts/blogs-catalog.json"
  );
  if (!fs.existsSync(catalogPath)) return [];

  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
  return catalog.map((post: { slug: string }) => `/blogs/${post.slug}`);
}

// Service routes from service-offerings.ts
function getServiceRoutes() {
  try {
    const groups = getServiceOfferings(1, 2, 3, 4, 5); // load all groups
    return groups.flatMap((group) =>
      group.services.map((service) => {
        const srvcGrp = group.title.toLowerCase().replace(/ & | /g, "-");
        const slug = service.toLowerCase().replace(/ & | /g, "-");
        return `/servicedetails/${srvcGrp}/${slug}`;
      })
    );
  } catch {
    return [];
  }
}

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8081,
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://ladonco.ph",
      dynamicRoutes: [
        "/",
        "/about",
        "/blogs",
        "/contact",
        "/projects",
        ...getBlogRoutes(),
        ...getServiceRoutes(),
      ],
      outDir: "dist",
      lastmod: new Date(),
      changefreq: "daily",
      priority: 0.7,
      readable: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
