/** @type {import('next').NextConfig} */
const nextConfig = {
  // static HTML export — the site is deployed to plain FTP hosting without a Node runtime
  output: 'export',
  // emits `out/human/identity/index.html`, so deep links resolve without server rewrites
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
