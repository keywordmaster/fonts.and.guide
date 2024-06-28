import { MetadataRoute } from "next";
import { gql } from "urql/core";

import { GetPostsSitemapQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertModifiedDateFormat } from "@/utils/sitemap";

export default async function sitemap(
  {
    // id,
  }: {
    // id: number
  },
): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const {
    data: {
      posts: { nodes: posts },
    },
  } = await getClient().query<GetPostsSitemapQuery>(
    gql`
      query GetPostsSitemap {
        posts {
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

  return posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/blog${post.uri}`,
    lastModified: convertModifiedDateFormat(post.modified),
  }));
}
