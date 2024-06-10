export const runtime = "edge";

import { gql } from "@urql/core";
import Link from "next/link";

import { GetPostsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function Home() {
  const { data, error } = await getClient().query<GetPostsQuery>(
    gql`
      query GetPosts {
        posts(first: 100) {
          nodes {
            id
            title
            uri
            author {
              node {
                name
              }
            }
            slug
          }
        }
      }
    `,
    {},
  );
  return (
    <ul>
      {data
        ? data.posts.nodes.map((node) => (
            <Link key={node.id} href={`/blog${node.uri}`} prefetch>
              <li key={node.id}>{node.title}</li>
            </Link>
          ))
        : JSON.stringify(error)}
    </ul>
  );
}
