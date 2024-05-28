import { gql } from "@urql/core";

import { GetContentNodeQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { getContent } from "@/lib/utils";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string };
}) {
  const { data } = await getClient().query<GetContentNodeQuery>(
    gql`
      query GetContentNode($id: ID!) {
        contentNode(id: $id, idType: URI) {
          __typename
          contentTypeName
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithContentEditor {
            content
          }
          date
        }
      }
    `,
    {
      id: decodeURI(uri),
    },
  );

  if (!data?.contentNode) {
    return <div>404</div>;
  }

  return (
    <main>
      <h2>{data?.contentNode?.title}</h2>
      <article dangerouslySetInnerHTML={{ __html: getContent(data) }} />
    </main>
  );
}
