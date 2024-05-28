import type { GetContentNodeQuery } from "@/gql/graphql";

export const getContent = (data: GetContentNodeQuery) => {
  if (data.contentNode.__typename === "MediaItem") {
    return null;
  }

  return data.contentNode.content;
};
