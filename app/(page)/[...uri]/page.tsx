export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";
import { GetPageQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetPageQuery>(
    gql`
      query GetPage($id: ID!) {
        breadcrumbs: page(id: $id, idType: URI) {
          ancestors {
            nodes {
              uri
              ... on NodeWithTitle {
                title
              }
            }
          }
        }
        page(id: $id, idType: URI) {
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
  // console.log(data);

  if (!data.page) {
    notFound();
  }

  return (
    <>
      <BreadcrumbsWithSchema
        pathMetaData={[
          ["/", "Home"],
          ["/부모페이지", "부모페이지"],
          ["/child", "CHILD"],
        ]}
      />
      <h1>{data.page?.title}</h1>
      <div className="overflow-x-scroll p-4 bg-muted/50">
        <pre>{JSON.stringify(data.breadcrumbs)}</pre>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.page?.content }} />
    </>
  );
}
