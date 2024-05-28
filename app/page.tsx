import { gql } from "@urql/core";
import Link from "next/link";

import { GetPostsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

const postsQuery = gql`
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
`;

export default async function Home() {
  const { data, error } = await getClient().query<GetPostsQuery>(
    postsQuery,
    {},
  );
  return (
    <main>
      <h1>This is rendered as part of an RSC</h1>
      <ul>
        {data
          ? data.posts.nodes.map((node) => (
            <Link key={node.id} href={node.uri}>
              <li key={node.id}>{node.title}</li>
            </Link>
          ))
          : JSON.stringify(error)}
      </ul>
    </main>
  );
}
