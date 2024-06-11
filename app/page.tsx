import { gql } from "@urql/core";
import Link from "next/link";

import { GetFontfamiliesQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

const postsQuery = gql`
  query GetFontfamilies {
    fontfamilies(first: 100) {
      nodes {
        id
        title
        uri
        slug
      }
    }
  }
`;

export default async function Home() {
  const { data, error } = await getClient().query<GetFontfamiliesQuery>(
    postsQuery,
    {},
  );
  return (
    <ul>
      {data
        ? data.fontfamilies.nodes.map((node) => (
            <Link key={node.id} href={node.uri} prefetch>
              <li key={node.id}>{node.title}</li>
            </Link>
          ))
        : JSON.stringify(error)}
    </ul>
  );
}
