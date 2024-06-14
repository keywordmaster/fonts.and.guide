"use client";

import { gql, useQuery } from "@urql/next";
import Link from "next/link";
import { useMemo, useState } from "react";

import { GetFontfamiliesClientQuery } from "@/gql/graphql";

const FontfamilyList: React.FC = () => {
  const [after, setAfter] = useState<string>();

  const [{ data, error, stale }] = useQuery<GetFontfamiliesClientQuery>({
    query: gql`
      query GetFontfamiliesClient($first: Int!, $after: String) {
        __typename
        fontfamilies(first: $first, after: $after) {
          __typename
          edges {
            __typename
            node {
              __typename
              id
              title
              uri
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
    variables: {
      first: 2,
      after,
    },
    context: useMemo(() => ({ suspense: !after }), [after]),
  });

  return (
    <>
      <ul>
        {data
          ? data.fontfamilies.edges.map(({ node }) => (
              <Link key={node.id} href={node.uri} prefetch>
                <li key={node.id}>{node.title}</li>
              </Link>
            ))
          : JSON.stringify(error)}
      </ul>
      <button
        disabled={!data.fontfamilies?.pageInfo.hasNextPage}
        onClick={() => {
          if (!data.fontfamilies?.pageInfo.endCursor) {
            throw new Error("Missing pagination cursor");
          }
          setAfter(data.fontfamilies.pageInfo.endCursor);
        }}
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:focus-visible:ring disabled:focus-visible:ring-white disabled:focus-visible:ring-opacity-50"
      >
        Load More
      </button>
    </>
  );
};

export default FontfamilyList;
