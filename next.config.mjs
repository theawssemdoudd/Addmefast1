/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ تعطيل ESLint وقت الـ build في Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ تعطيل فحص الـ TypeScript وقت الـ build (اختياري)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
