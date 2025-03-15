import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["lucide-react"],
	trailingSlash: true,
	images: {
		domains: ["wp-fonts.and.guide"],
	},
	// TODO: Redirect 설정이 필요할 때 활용
	// redirects: async () => {
	//   return [
	//     {
	//       source: '/blog/category/',
	//       destination: '/blog/category/',
	//       permanent: true,
	//       statusCode: 301,
	//     },
	//   ]
	// },
};

export default nextConfig;
