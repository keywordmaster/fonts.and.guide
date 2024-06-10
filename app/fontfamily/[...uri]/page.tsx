export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import { GetFontFamilyQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import {
  getBreadcrumbsByContentNode,
  getContentByContentNode,
} from "@/lib/utils";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetFontFamilyQuery>(
    gql`
      query GetFontFamily($id: ID!) {
        breadcrumbs: fontfamily(id: $id, idType: URI) {
          __typename
        }
        fontfamily(id: $id, idType: URI) {
          __typename
          id
          title
          uri
          content
        }
      }
    `,
    {
      id: decodeURI(uri.reduce((acc, cur) => `${acc}/${cur}`)),
    },
  );

  if (!data.fontfamily) {
    notFound();
  }

  return (
    <>
      <h1>{data.fontfamily?.title}</h1>
      <div className="overflow-x-scroll p-4 bg-muted/10">
        <pre>{JSON.stringify(data.breadcrumbs)}</pre>
      </div>
      <article dangerouslySetInnerHTML={{ __html: data.fontfamily.content }} />
    </>
  );
}
