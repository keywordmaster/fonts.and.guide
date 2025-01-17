import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// import type { GetContentNodeQuery } from "@/gql/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const camelToKebab = (str: string) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const deleteQueryString = (name: string, searchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);

  return params.toString();
};

export const decodeHtmlEntities = (str) => {
  var entityMap = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#x2F;": "/",
    "&#x5C;": "\\",
    "&#x60;": "`",
    "&#x3D;": "=",
    // TODO: Add more
  };

  return str.replace(/&[^;]+;/g, (entity) => entityMap[entity] || entity);
};

export const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "");
};

// export const getContentByContentNode = (data: GetContentNodeQuery) => {
//   if (data.contentNode.__typename === "MediaItem") {
//     return null;
//   }

//   return data.contentNode.content;
// };

// export const getBreadcrumbsByContentNode = ({
//   breadcrumbs,
// }: GetContentNodeQuery) => {
//   // REF: 카테고리가 여러개일 경우 첫번째 카테고리의 조상들을 반환
//   if (breadcrumbs.__typename === "Post") {
//     return breadcrumbs.categories.nodes[0]?.ancestors?.nodes;
//   }
//   // REF: HierarchicalContentNode 조상들을 반환
//   if (breadcrumbs.__typename === "Page") {
//     return breadcrumbs.ancestors?.nodes;
//   }

//   return null;
// };
