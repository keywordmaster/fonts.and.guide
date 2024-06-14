import { gql } from "@urql/core";
import Link from "next/link";

import { GetPostsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

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
      first: 2,
      after: null,
    },
  );
  return (
    <ul>
      {data
        ? data.posts.edges.map(({ node }) => (
            <Link key={node.id} href={`/blog${node.uri}`} prefetch>
              <li key={node.id}>{node.title}</li>
            </Link>
          ))
        : JSON.stringify(error)}
    </ul>
  );
}
