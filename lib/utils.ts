import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { GetContentNodeQuery } from "@/gql/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getContent = (data: GetContentNodeQuery) => {
  if (data.contentNode.__typename === "MediaItem") {
    return null;
  }

  return data.contentNode.content;
};
