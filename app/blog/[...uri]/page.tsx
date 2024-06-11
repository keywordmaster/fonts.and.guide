import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";

export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import { GetPostQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

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
            nodes {
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

  return (
    <>
      <BreadcrumbsWithSchema
        pathMetaData={[
          ["/", "Home"],
          ["/부모페이지", "부모페이지"],
          ["/child", "CHILD"],
        ]}
      />
      <h1>{data.post?.title}</h1>
      <div className="overflow-x-scroll p-4 bg-muted/50">
        <pre>{JSON.stringify(data.breadcrumbs)}</pre>
      </div>
      <article dangerouslySetInnerHTML={{ __html: data.post?.content }} />
    </>
  );
}
