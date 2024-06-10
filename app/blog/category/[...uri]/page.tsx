export const runtime = "edge";

import { gql } from "@urql/core";
import Link from "next/link";

import { GetPostsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function Page({ params: { uri } }) {
  const { data, error } = await getClient().query<GetPostsQuery>(
    gql`
      query GetPostsByCategory($category: String!) {
        posts(first: 100, where: { categoryName: $category }) {
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
    {
      category: uri.reduce((acc, cur) => `${acc}/${cur}`),
    },
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
