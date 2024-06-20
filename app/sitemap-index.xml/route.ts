// REF: https://github.com/vercel/next.js/discussions/61025
// TODO: lastmod 필드 추가하기
const paths = ["/", "/blog/", "/fontfamily/"];
const generateSitemapLink = (url: string) =>
  `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET() {
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${paths.map((path) => generateSitemapLink(`${process.env.NEXT_PUBLIC_URL}${path}sitemap.xml`)).join("")}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
