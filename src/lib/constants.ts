/**
 * Shared constants for the Skylife marketing app.
 */

// Media served from S3 (large assets are NOT bundled into the app).
export const S3_BASE = "https://skylife-test.s3.us-east-1.amazonaws.com";

export const VIDEO = {
  homepageHero: `${S3_BASE}/HomepageSL.mp4`,
} as const;

// Route paths — single source of truth so links never drift.
export const ROUTES = {
  home: "/",
  collections: "/collections",
  propertyDetail: (id: string | number) => `/collections/${id}`,
  experiences: "/experiences",
  experienceDetail: (id: string | number) => `/experiences/${id}`,
  experienceCollection: "/experiences/collection",
  packages: "/packages",
  packageDetail: (id: string | number) => `/packages/${id}`,
  owner: "/owner",
  // Footer / legal pages
  company: "/company",
  blog: "/blog",
  terms: "/terms",
  privacy: "/privacy",
} as const;
