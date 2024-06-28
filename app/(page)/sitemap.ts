import { MetadataRoute } from "next";
import { gql } from "urql/core";

import { GetPagesSitemapQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertModifiedDateFormat } from "@/utils/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const {
    data: {
      pages: { nodes: pages },
    },
  } = await getClient().query<GetPagesSitemapQuery>(
    gql`
      query GetPagesSitemap {
        pages {
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

  return pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${page.uri}`,
    lastModified: convertModifiedDateFormat(page.modified),
  }));
}
