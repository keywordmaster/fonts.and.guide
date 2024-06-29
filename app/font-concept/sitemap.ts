import { MetadataRoute } from "next";
import { gql } from "urql/core";

import { GetFontConceptSitemapQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertModifiedDateFormat } from "@/utils/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const {
    data: {
      fontConcepts: { nodes: pages },
    },
  } = await getClient().query<GetFontConceptSitemapQuery>(
    gql`
      query GetFontConceptSitemap {
        fontConcepts(first: 5000) {
          nodes {
            id
            uri
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
        }
      }
    `,
    {},
  );

  return pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${page.uri}`,
    lastModified: convertModifiedDateFormat(
      page.fontfamilies.nodes.at(-1)?.modified,
    ),
  }));
}
