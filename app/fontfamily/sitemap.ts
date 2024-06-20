import { MetadataRoute } from "next";
import { gql } from "urql/core";

import { GetFontfamiliesSitemapQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const {
    data: {
      fontfamilies: { nodes: fontfamilies },
    },
  } = await getClient().query<GetFontfamiliesSitemapQuery>(
    gql`
      query GetFontfamiliesSitemap {
        fontfamilies {
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

  return fontfamilies.map((fontfamily) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${fontfamily.uri}`,
    lastModified: fontfamily.modified,
  }));
}
