"use client";

import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { refocusExchange } from "@urql/exchange-refocus";
import {
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from "@urql/next";
import { useMemo } from "react";

import * as AllType from "@/gql/graphql";

type URQLProviderProps = {
  children: React.ReactNode;
};

export default function URQLProvider({ children }: URQLProviderProps) {
  const [client, ssr] = useMemo(() => {
    // if (!process.env.WORDPRESS_ENDPOINT) throw new Error('Missing WORDPRESS_ENDPOINT');

    const cache = cacheExchange({
      ...AllType,
      resolvers: {
        Query: {
          GetFontfamiliesClient: relayPagination(),
        },
      },
    });

    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_WORDPRESS_ENDPOINT,
      exchanges: [refocusExchange(), cache, ssr, fetchExchange],
      suspense: true,
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BASIC_AUTH}`,
        },
      },
      preferGetMethod: true,
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
