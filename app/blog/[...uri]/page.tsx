import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";

export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import { GetPostQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPostCategoryQueryToPathMetaData } from "@/utils/breadcrumbs";

import RedaingTime from "./_components/reading-time";
import ScrollIndicator from "./_components/scroll-indicator";
import ToC from "./_components/toc";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetPostQuery>(
    gql`
      query GetPost($id: ID!) {
        breadcrumbs: post(id: $id, idType: URI) {
          id
          categories {
            edges {
              node {
                uri
                name
              }
            }
            nodes {
              id
              ancestors {
                nodes {
                  id
                  uri
                  name
                }
              }
            }
          }
        }
        post(id: $id, idType: URI) {
          __typename
          id
          title
          content
          date
        }
      }
    `,
    {
      id: decodeURI(uri.reduce((acc, cur) => `${acc}/${cur}`)),
    },
  );

  if (!data.post) {
    notFound();
  }

  // TODO: 새로 추가된 컴포넌트의 레이아웃 재배치 필요
  return (
    <>
      <ScrollIndicator />
      <BreadcrumbsWithSchema
        pathMetaData={convertPostCategoryQueryToPathMetaData(data)}
        lastNodeType={LAST_NODE_TYPE.link}
      />
      <h1>{data.post?.title}</h1>
      <RedaingTime content={data.post?.content} />
      <ToC content={data.post?.content} />
      <div className="overflow-x-scroll p-4 bg-muted/50">
        <pre>{JSON.stringify(data.breadcrumbs)}</pre>
      </div>
      <article
        className="font-sans"
        dangerouslySetInnerHTML={{ __html: data.post?.content }}
      />
    </>
  );
}
