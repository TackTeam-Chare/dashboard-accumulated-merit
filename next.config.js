module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/src/app/api/:path*',
      },
    ];
  },
    async headers() {
      return [
        {
          source: "/api/(.*)",
          headers: [
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "POST,GET,OPTIONS" },
            { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          ],
        },
      ];
    },
  };
  