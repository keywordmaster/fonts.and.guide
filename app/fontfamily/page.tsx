import { gql } from "@urql/core";
import { Metadata } from "next";

import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";
import { GetFontfamilyPageInfoQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPageQueryToPathMetaData } from "@/utils/breadcrumbs";

export const metadata: Metadata = {
  title: "폰트 패밀리",
  description: "폰트 패밀리에 대한 정보를 제공합니다.",
  openGraph: {
    title: "폰트 패밀리",
    description: "폰트 패밀리에 대한 정보를 제공합니다.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_URL}/blog`,
    images: ["./og.svg"],
    siteName: "폰트 & 가이드",
    locale: "ko_KR",
  },
};

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
