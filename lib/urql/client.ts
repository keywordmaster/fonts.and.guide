import { createClient, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { persistedExchange } from "@urql/exchange-persisted";
import { registerUrql } from "@urql/next/rsc";

import * as AllType from "@/gql/graphql";

const makeClient = () => {
  return createClient({
    url: process.env.WORDPRESS_ENDPOINT,
    exchanges: [
      cacheExchange({
        ...AllType,
        resolvers: {
          Query: {
            GetFontfamilies: relayPagination(),
          },
        },
      }),
      fetchExchange,
      persistedExchange({
        enforcePersistedQueries: true,
        enableForMutation: true,
        generateHash: (_, document) =>
          Promise.resolve(document["__meta__"]["hash"]),
      }),
    ],

    fetchOptions: {
      headers: {
        Authorization: `Basic ${process.env.BASIC_AUTH}`,
      },
    },
    preferGetMethod: "force",
  });
};

export const { getClient } = registerUrql(makeClient);
