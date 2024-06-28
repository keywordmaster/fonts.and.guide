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
  "\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n          id\n          title\n          uri\n          ancestors {\n            nodes {\n              id\n              uri\n              ... on NodeWithTitle {\n                title\n              }\n            }\n          }\n        }\n        page(id: $id, idType: URI) {\n          id\n          title\n          content\n          date\n        }\n      }\n    ":
    types.GetPageDocument,
  "\n      query GetPagesSitemap {\n        pages {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ":
    types.GetPagesSitemapDocument,
  "\n      query GetFontfamilyFilters {\n        fontAuthor: terms(where: { taxonomies: [FONTAUTHOR] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontCategory: terms(where: { taxonomies: [FONTCATEGORY] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontConcept: terms(first: 20, where: { taxonomies: [FONTCONCEPT], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontSubset: terms(where: { taxonomies: [FONTSUBSET] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontUsage: terms(where: { taxonomies: [FONTUSAGE], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontVariant: terms(where: { taxonomies: [FONTVARIANT], parent: 117 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n      }\n    ":
    types.GetFontfamilyFiltersDocument,
  "\n      query GetFontfamiliesClient(\n        $field: PostObjectsConnectionOrderbyEnum!\n        $order: OrderEnum!\n        $filters: [TaxArray]\n      ) {\n        fontfamilies(\n          first: 1000\n          where: {\n            orderby: { field: $field, order: $order }\n            taxQuery: { taxArray: $filters }\n          }\n        ) {\n          edges {\n            node {\n              id\n              title\n              uri\n              content\n              modified\n              commentCount\n              featuredImage {\n                node {\n                  id\n                  srcSet\n                  sourceUrl\n                  altText\n                }\n              }\n              specs {\n                id: fontName\n                fontName\n                fontNameEn\n                downloadLink\n                isGoogleFonts\n                license\n                menuUrl\n                version\n              }\n              fontAuthors {\n                nodes {\n                  id\n                  name\n                }\n              }\n              fontCategories {\n                nodes {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          pageInfo {\n            total\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n        total: fontfamilies {\n          pageInfo {\n            total\n          }\n        }\n      }\n    ":
    types.GetFontfamiliesClientDocument,
  "\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n          id\n          categories {\n            edges {\n              node {\n                uri\n                name\n              }\n            }\n            nodes {\n              id\n              ancestors {\n                nodes {\n                  id\n                  uri\n                  name\n                }\n              }\n            }\n          }\n        }\n        post(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          content\n          date\n        }\n      }\n    ":
    types.GetPostDocument,
  "\n      query GetPostsByCategory($category: String!) {\n        posts(first: 100, where: { categoryName: $category }) {\n          nodes {\n            id\n            title\n            uri\n            author {\n              node {\n                name\n              }\n            }\n            slug\n          }\n        }\n      }\n    ":
    types.GetPostsByCategoryDocument,
  "\n      query GetPosts($first: Int!, $after: String) {\n        posts(first: $first, after: $after) {\n          edges {\n            node {\n              id\n              title\n              uri\n              author {\n                node {\n                  id\n                  name\n                }\n              }\n              slug\n            }\n          }\n          pageInfo {\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n      }\n    ":
    types.GetPostsDocument,
  "\n      query GetPostsSitemap {\n        posts {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ":
    types.GetPostsSitemapDocument,
  "\n      query GetFontFamily($id: ID!) {\n        __typename\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          id\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n          date\n          modified\n        }\n      }\n    ":
    types.GetFontFamilyDocument,
  "\n      query GetFontfamiliesSitemap {\n        fontfamilies {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ":
    types.GetFontfamiliesSitemapDocument,
  "\n    query GetRootLayout {\n      generalSettings {\n        id: __typename\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  ":
    types.GetRootLayoutDocument,
  "\n      query GetRootSitemap {\n        pages(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        posts(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        fontfamilies(\n          first: 1\n          where: { orderby: { field: MODIFIED, order: DESC } }\n        ) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ":
    types.GetRootSitemapDocument,
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
  source: "\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n          id\n          title\n          uri\n          ancestors {\n            nodes {\n              id\n              uri\n              ... on NodeWithTitle {\n                title\n              }\n            }\n          }\n        }\n        page(id: $id, idType: URI) {\n          id\n          title\n          content\n          date\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPage($id: ID!) {\n        breadcrumbs: page(id: $id, idType: URI) {\n          id\n          title\n          uri\n          ancestors {\n            nodes {\n              id\n              uri\n              ... on NodeWithTitle {\n                title\n              }\n            }\n          }\n        }\n        page(id: $id, idType: URI) {\n          id\n          title\n          content\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPagesSitemap {\n        pages {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPagesSitemap {\n        pages {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetFontfamilyFilters {\n        fontAuthor: terms(where: { taxonomies: [FONTAUTHOR] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontCategory: terms(where: { taxonomies: [FONTCATEGORY] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontConcept: terms(first: 20, where: { taxonomies: [FONTCONCEPT], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontSubset: terms(where: { taxonomies: [FONTSUBSET] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontUsage: terms(where: { taxonomies: [FONTUSAGE], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontVariant: terms(where: { taxonomies: [FONTVARIANT], parent: 117 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetFontfamilyFilters {\n        fontAuthor: terms(where: { taxonomies: [FONTAUTHOR] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontCategory: terms(where: { taxonomies: [FONTCATEGORY] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontConcept: terms(first: 20, where: { taxonomies: [FONTCONCEPT], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontSubset: terms(where: { taxonomies: [FONTSUBSET] }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontUsage: terms(where: { taxonomies: [FONTUSAGE], parent: 0 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n        fontVariant: terms(where: { taxonomies: [FONTVARIANT], parent: 117 }) {\n          nodes {\n            id\n            name\n            uri\n            slug\n            taxonomyName\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetFontfamiliesClient(\n        $field: PostObjectsConnectionOrderbyEnum!\n        $order: OrderEnum!\n        $filters: [TaxArray]\n      ) {\n        fontfamilies(\n          first: 1000\n          where: {\n            orderby: { field: $field, order: $order }\n            taxQuery: { taxArray: $filters }\n          }\n        ) {\n          edges {\n            node {\n              id\n              title\n              uri\n              content\n              modified\n              commentCount\n              featuredImage {\n                node {\n                  id\n                  srcSet\n                  sourceUrl\n                  altText\n                }\n              }\n              specs {\n                id: fontName\n                fontName\n                fontNameEn\n                downloadLink\n                isGoogleFonts\n                license\n                menuUrl\n                version\n              }\n              fontAuthors {\n                nodes {\n                  id\n                  name\n                }\n              }\n              fontCategories {\n                nodes {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          pageInfo {\n            total\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n        total: fontfamilies {\n          pageInfo {\n            total\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetFontfamiliesClient(\n        $field: PostObjectsConnectionOrderbyEnum!\n        $order: OrderEnum!\n        $filters: [TaxArray]\n      ) {\n        fontfamilies(\n          first: 1000\n          where: {\n            orderby: { field: $field, order: $order }\n            taxQuery: { taxArray: $filters }\n          }\n        ) {\n          edges {\n            node {\n              id\n              title\n              uri\n              content\n              modified\n              commentCount\n              featuredImage {\n                node {\n                  id\n                  srcSet\n                  sourceUrl\n                  altText\n                }\n              }\n              specs {\n                id: fontName\n                fontName\n                fontNameEn\n                downloadLink\n                isGoogleFonts\n                license\n                menuUrl\n                version\n              }\n              fontAuthors {\n                nodes {\n                  id\n                  name\n                }\n              }\n              fontCategories {\n                nodes {\n                  id\n                  name\n                }\n              }\n            }\n          }\n          pageInfo {\n            total\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n        total: fontfamilies {\n          pageInfo {\n            total\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n          id\n          categories {\n            edges {\n              node {\n                uri\n                name\n              }\n            }\n            nodes {\n              id\n              ancestors {\n                nodes {\n                  id\n                  uri\n                  name\n                }\n              }\n            }\n          }\n        }\n        post(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          content\n          date\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPost($id: ID!) {\n        breadcrumbs: post(id: $id, idType: URI) {\n          id\n          categories {\n            edges {\n              node {\n                uri\n                name\n              }\n            }\n            nodes {\n              id\n              ancestors {\n                nodes {\n                  id\n                  uri\n                  name\n                }\n              }\n            }\n          }\n        }\n        post(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          content\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPostsByCategory($category: String!) {\n        posts(first: 100, where: { categoryName: $category }) {\n          nodes {\n            id\n            title\n            uri\n            author {\n              node {\n                name\n              }\n            }\n            slug\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPostsByCategory($category: String!) {\n        posts(first: 100, where: { categoryName: $category }) {\n          nodes {\n            id\n            title\n            uri\n            author {\n              node {\n                name\n              }\n            }\n            slug\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPosts($first: Int!, $after: String) {\n        posts(first: $first, after: $after) {\n          edges {\n            node {\n              id\n              title\n              uri\n              author {\n                node {\n                  id\n                  name\n                }\n              }\n              slug\n            }\n          }\n          pageInfo {\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPosts($first: Int!, $after: String) {\n        posts(first: $first, after: $after) {\n          edges {\n            node {\n              id\n              title\n              uri\n              author {\n                node {\n                  id\n                  name\n                }\n              }\n              slug\n            }\n          }\n          pageInfo {\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetPostsSitemap {\n        posts {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetPostsSitemap {\n        posts {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetFontFamily($id: ID!) {\n        __typename\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          id\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n          date\n          modified\n        }\n      }\n    ",
): (typeof documents)["\n      query GetFontFamily($id: ID!) {\n        __typename\n        breadcrumbs: fontfamily(id: $id, idType: URI) {\n          id\n          __typename\n        }\n        fontfamily(id: $id, idType: URI) {\n          __typename\n          id\n          title\n          uri\n          content\n          date\n          modified\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetFontfamiliesSitemap {\n        fontfamilies {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetFontfamiliesSitemap {\n        fontfamilies {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetRootLayout {\n      generalSettings {\n        id: __typename\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    query GetRootLayout {\n      generalSettings {\n        id: __typename\n        title\n        description\n      }\n      primaryMenus: menuItems(where: { location: PRIMARY }) {\n        nodes {\n          id\n          label\n          uri\n          title # for Lucide Icon name\n        }\n      }\n      footerMenus: menuItems(where: { location: FOOTER }) {\n        nodes {\n          id\n          label\n          uri\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetRootSitemap {\n        pages(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        posts(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        fontfamilies(\n          first: 1\n          where: { orderby: { field: MODIFIED, order: DESC } }\n        ) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      query GetRootSitemap {\n        pages(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        posts(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n        fontfamilies(\n          first: 1\n          where: { orderby: { field: MODIFIED, order: DESC } }\n        ) {\n          nodes {\n            id\n            uri\n            modified\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
