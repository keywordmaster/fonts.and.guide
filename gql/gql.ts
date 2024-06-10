/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n            ancestors {\n              nodes {\n                uri\n                ... on NodeWithTitle {\n                  title\n                }\n              }\n            }\n        }\n        page(id: $id, idType: URI) {\n          title\n          content\n          date\n        }\n      }\n    ":
    types.GetPageDocument,
  "\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n            categories {\n              nodes {\n                ancestors {\n                  nodes {\n                    uri\n                    name\n                  }\n                }\n              }\n            }\n          }\n        post(id: $id, idType: URI) {\n          __typename\n          title\n          content\n          date\n        }\n      }\n    ":
    types.GetPostDocument,
  "\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n\t":
    types.GetPostsDocument,
  "\n      query GetFontFamily($id: ID!) {\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n        }\n      }\n    ":
    types.GetFontFamilyDocument,
  "\n    query GetRootLayout {\n      generalSettings {\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  ":
    types.GetRootLayoutDocument,
  "\n  query GetFontfamilies {\n    fontfamilies(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        slug\n      }\n    }\n  }\n":
    types.GetFontfamiliesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n            ancestors {\n              nodes {\n                uri\n                ... on NodeWithTitle {\n                  title\n                }\n              }\n            }\n        }\n        page(id: $id, idType: URI) {\n          title\n          content\n          date\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n            ancestors {\n              nodes {\n                uri\n                ... on NodeWithTitle {\n                  title\n                }\n              }\n            }\n        }\n        page(id: $id, idType: URI) {\n          title\n          content\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n            categories {\n              nodes {\n                ancestors {\n                  nodes {\n                    uri\n                    name\n                  }\n                }\n              }\n            }\n          }\n        post(id: $id, idType: URI) {\n          __typename\n          title\n          content\n          date\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n            categories {\n              nodes {\n                ancestors {\n                  nodes {\n                    uri\n                    name\n                  }\n                }\n              }\n            }\n          }\n        post(id: $id, idType: URI) {\n          __typename\n          title\n          content\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n\t",
): (typeof documents)["\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetFontFamily($id: ID!) {\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n        }\n      }\n    ",
): (typeof documents)["\n      query GetFontFamily($id: ID!) {\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetRootLayout {\n      generalSettings {\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    query GetRootLayout {\n      generalSettings {\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetFontfamilies {\n    fontfamilies(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        slug\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetFontfamilies {\n    fontfamilies(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        slug\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
