import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";
import { GetFontfamilyPageInfoQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPageQueryToPathMetaData } from "@/utils/breadcrumbs";

export default async function Page() {
  const { data } = await getClient().query<GetFontfamilyPageInfoQuery>(
    gql`
      query GetFontfamilyPageInfo {
        breadcrumbs: page(id: "fontfamily", idType: URI) {
          id
          title
          uri
          ancestors {
            nodes {
              id
              uri
              ... on NodeWithTitle {
                title
              }
            }
          }
        }
        fontConcepts(
          first: 20
          where: { parent: 0, order: ASC, orderby: TERM_ORDER }
        ) {
          nodes {
            id
            name
            uri
            slug
          }
        }
      }
    `,
    {},
  );

  return (
    <div className="grid gap-4">
      <BreadcrumbsWithSchema
        pathMetaData={convertPageQueryToPathMetaData(data)}
      />
      <p>준비중입니다.</p>
    </div>
  );
}
