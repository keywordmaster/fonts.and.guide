import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

console.log("  - CURRENT ENDPOINT:", process.env.WORDPRESS_ENDPOINT, "\n");

const config: CodegenConfig = {
  schema: [
    {
      [`${process.env.WORDPRESS_ENDPOINT}`]: {
        headers: {
          Authorization: `Basic ${process.env.BASIC_AUTH}`,
        },
      },
    },
  ],
  overwrite: true,
  documents: "app/**/*.{ts,tsx}",
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        persistedDocuments: true,
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
