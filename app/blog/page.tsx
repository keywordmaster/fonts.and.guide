import { gql } from "@urql/core";
import { Metadata } from "next";
import Link from "next/link";

import { GetPostsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export const metadata: Metadata = {
  title: "블로그",
  description: "폰트 & 가이드의 블로그입니다.",
  openGraph: {
    title: "블로그",
    description: "폰트 & 가이드의 블로그입니다.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_URL}/blog`,
    images: ["./og.png"],
    siteName: "폰트 & 가이드",
    locale: "ko_KR",
  },
};

export default async function Home({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data, error } = await getClient().query<GetPostsQuery>(
    gql`
      query GetPosts($first: Int!, $after: String) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              uri
              author {
                node {
                  id
                  name
                }
              }
              slug
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
    {
      first: 20,
      after: null,
    },
  );
  return (
    <ul>
      {data
        ? data.posts.edges.map(({ node }) => (
          <li key={node.id}>
            <Link key={node.id} href={`/blog${node.uri}`} prefetch>
              {node.title}
            </Link>
          </li>
        ))
        : JSON.stringify(error)}
    </ul>
  );
}
