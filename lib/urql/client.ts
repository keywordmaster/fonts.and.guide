import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { persistedExchange } from "@urql/exchange-persisted";
import { registerUrql } from "@urql/next/rsc";

const makeClient = () => {
  return createClient({
    url: process.env.WORDPRESS_ENDPOINT,
    exchanges: [
      cacheExchange,
      fetchExchange,
      persistedExchange({
        enforcePersistedQueries: true,
        enableForMutation: true,
        generateHash: (_, document) => Promise.resolve(document['__meta__']['hash'])
      })
    ],
    fetchOptions: {
      headers: {
        Authorization: `Basic ${process.env.BASIC_AUTH}`,
      },
    },
  });
};

export const { getClient } = registerUrql(makeClient);
