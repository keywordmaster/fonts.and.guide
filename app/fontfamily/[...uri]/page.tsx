export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import { GetFontFamilyQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetFontFamilyQuery>(
    gql`
      query GetFontFamily($id: ID!) {
        __typename
        breadcrumbs: fontfamily(id: $id, idType: URI) {
          id
          __typename
        }
        fontfamily(id: $id, idType: URI) {
          __typename
          id
          title
          uri
          content
          date
          modified
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
        <pre>{JSON.stringify(data.fontfamily.modified)}</pre>
      </div>
      <article dangerouslySetInnerHTML={{ __html: data.fontfamily.content }} />
    </>
  );
}
