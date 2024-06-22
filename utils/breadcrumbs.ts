import { BreadcrumbItem } from "react-breadcrumbs-jsonld";

import { GetPageQuery, GetPostQuery } from "@/gql/graphql";

type ConvertFnExtraParam<T> = T & {
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

export const convertPostCategoryQueryToPathMetaData = ({
  breadcrumbs,
  basePathMetaData = [{ path: "/", name: "Home" }],
}: ConvertFnExtraParam<GetPostQuery>): BreadcrumbMetaData[] => {
  const { ancestors } = breadcrumbs.categories.nodes[0];
  if (!ancestors) {
    // Uncategorized
    return basePathMetaData;
  }

  return [
    ...basePathMetaData,
    ...ancestors.nodes.map(({ name, uri }) => ({
      path: uri,
      name,
    })),
  ];
};

export const convertPageQueryToPathMetaData = ({
  breadcrumbs,
  basePathMetaData = [{ path: "/", name: "Home" }],
}: ConvertFnExtraParam<GetPageQuery>): BreadcrumbMetaData[] => {
  const { ancestors, title, uri } = breadcrumbs;
  const lastBreadcrumb: BreadcrumbMetaData = { path: uri, name: title };
  if (!ancestors) {
    return [...basePathMetaData, lastBreadcrumb];
  }

  return [
    ...basePathMetaData,
    ...ancestors.nodes.map(({ title, uri }) => ({
      path: uri,
      name: title,
    })),
    lastBreadcrumb,
  ];
};
