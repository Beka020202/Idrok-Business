/** @type {import('next').NextConfig} */
// Static export so the app can be bundled into the Android APK (Capacitor serves ./out).
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
