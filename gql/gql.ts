/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n      query GetContentNode($id: ID!) {\n        contentNode(id: $id, idType: URI) {\n          __typename\n          contentTypeName\n          ... on NodeWithTitle {\n            title\n          }\n          ... on NodeWithContentEditor {\n            content\n          }\n          date\n        }\n      }\n    ": types.GetContentNodeDocument,
    "\n      query GetCategories {\n        categories {\n          edges {\n            cursor\n            node {\n              id\n              name\n              slug\n            }\n          }\n        }\n      }\n    ": types.GetCategoriesDocument,
    "\n  query GetRootLayout {\n    generalSettings {\n      title\n      description\n    }\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n  }\n": types.GetRootLayoutDocument,
    "\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n": types.GetPostsDocument,
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
export function graphql(source: "\n      query GetContentNode($id: ID!) {\n        contentNode(id: $id, idType: URI) {\n          __typename\n          contentTypeName\n          ... on NodeWithTitle {\n            title\n          }\n          ... on NodeWithContentEditor {\n            content\n          }\n          date\n        }\n      }\n    "): (typeof documents)["\n      query GetContentNode($id: ID!) {\n        contentNode(id: $id, idType: URI) {\n          __typename\n          contentTypeName\n          ... on NodeWithTitle {\n            title\n          }\n          ... on NodeWithContentEditor {\n            content\n          }\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetCategories {\n        categories {\n          edges {\n            cursor\n            node {\n              id\n              name\n              slug\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetCategories {\n        categories {\n          edges {\n            cursor\n            node {\n              id\n              name\n              slug\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRootLayout {\n    generalSettings {\n      title\n      description\n    }\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRootLayout {\n    generalSettings {\n      title\n      description\n    }\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        label\n        uri\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    posts(first: 100) {\n      nodes {\n        id\n        title\n        uri\n        author {\n          node {\n            name\n          }\n        }\n        slug\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;