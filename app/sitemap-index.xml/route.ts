// REF: https://github.com/vercel/next.js/discussions/61025
import { gql } from "urql/core";

import { GetRootSitemapQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertModifiedDateFormat } from "@/utils/sitemap";

const generateSitemapLink = (url: string, modified: string) =>
  `<sitemap><loc>${url}</loc><lastmod>${convertModifiedDateFormat(modified)}</lastmod></sitemap>`;

export async function GET() {
  const {
    data: { posts, pages, fontfamilies },
  } = await getClient().query<GetRootSitemapQuery>(
    gql`
      query GetRootSitemap {
        pages(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          nodes {
            id
            uri
            modified
          }
        }
        posts(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          nodes {
            id
            uri
            modified
          }
        }
        fontfamilies(
          first: 1
          where: { orderby: { field: MODIFIED, order: DESC } }
        ) {
          nodes {
            id
            uri
            modified
          }
        }
      }
    `,
    {},
  );

  const paths = [
    { path: "/", modified: posts.nodes.at(-1)?.modified },
    { path: "/blog/", modified: pages.nodes.at(-1)?.modified },
    { path: "/fontfamily/", modified: fontfamilies.nodes.at(-1)?.modified },
    { path: "/font-concept/", modified: fontfamilies.nodes.at(-1)?.modified },
  ];

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${paths
        .map(({ path, modified }) =>
          generateSitemapLink(
            `${process.env.NEXT_PUBLIC_URL}${path}sitemap.xml`,
            modified,
          ),
        )
        .join("")}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
