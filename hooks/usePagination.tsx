"use client";

import { gql, useQuery } from "@urql/next";

import { WpPageInfo } from "@/gql/graphql";

type Props = {
  query: string;
} & WpPageInfo;

// countPerPage: number, totalCount: number, endCursor: string, startCursor: string

const usePagination = (query: string) => {
  // const [] = useQuery(query, {})
  const fetchMore = async (after: string) => {
    // const { data, error } = await client.query(
    // 	gql`
    // 		${query}
    // 	`,
    // 	{
    // 		first,
    // 		after,
    // 	},
    // );
    // return { data, error };
  };

  return { fetchMore };
};

export default usePagination;
