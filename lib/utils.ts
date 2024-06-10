import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// import type { GetContentNodeQuery } from "@/gql/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
