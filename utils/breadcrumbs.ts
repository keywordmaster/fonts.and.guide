import { BreadcrumbItem } from "react-breadcrumbs-jsonld";

import { GetPageQuery, GetPostQuery } from "@/gql/graphql";

type BasePathParam = {
  basePathMetaData?: BreadcrumbMetaData[];
};

export type BreadcrumbMetaData = {
  path: string;
  name: string;
};

export const GenerateBreadcrumbsSchema = (
  pathMetaData: BreadcrumbMetaData[],
  baseURL = process.env.NEXT_PUBLIC_URL,
): BreadcrumbItem[] => {
  return pathMetaData.map(({ path, name }) => ({
    url: `${baseURL}${path}`,
    name,
  }));
};

// TODO: Generic type for breadcrumbs
export const convertPostCategoryQueryToPathMetaData = ({
  breadcrumbs,
  basePathMetaData = [{ path: "/", name: "Home" }],
}: GetPostQuery & BasePathParam): BreadcrumbMetaData[] => {
  const { ancestors } = breadcrumbs.categories.nodes[0];
  const { uri, name } = breadcrumbs.categories.edges[0].node;

  const lastBreadcrumb: BreadcrumbMetaData = { path: uri, name: name };

  if (!ancestors) {
    // Uncategorized
    return [...basePathMetaData, lastBreadcrumb];
  }

  return [
    ...basePathMetaData,
    ...ancestors.nodes.reverse().map(({ name, uri }) => ({
      path: uri,
      name,
    })),
    lastBreadcrumb,
  ];
};

export const convertPageQueryToPathMetaData = ({
  breadcrumbs,
  basePathMetaData = [{ path: "/", name: "Home" }],
}: GetPageQuery & BasePathParam): BreadcrumbMetaData[] => {
  const { ancestors, title, uri } = breadcrumbs;
  const lastBreadcrumb: BreadcrumbMetaData = { path: uri, name: title };

  if (!ancestors) {
    return [...basePathMetaData, lastBreadcrumb];
  }

  return [
    ...basePathMetaData,
    ...ancestors.nodes.reverse().map(({ title, uri }) => ({
      path: uri,
      name: title,
    })),
    lastBreadcrumb,
  ];
};
