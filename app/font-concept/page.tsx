import { gql } from "@urql/core";
import Link from "next/link";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";
import { GetFontConceptsQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPageQueryToPathMetaData } from "@/utils/breadcrumbs";

export default async function Page(
  {
    // params: { uri },
  }: {
    // params: { uri: string[] };
  },
) {
  const { data } = await getClient().query<GetFontConceptsQuery>(
    gql`
      query GetFontConcepts {
        breadcrumbs: page(id: "font-concept", idType: URI) {
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
            description
          }
        }
      }
    `,
    {},
  );

  return (
    <>
      <BreadcrumbsWithSchema
        pathMetaData={convertPageQueryToPathMetaData(data)}
      />
      <h1 className="text-2xl font-bold mt-4">추천 폰트 컨셉</h1>
      <p className="mt-2"></p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.fontConcepts.nodes.map((node) => {
          return (
            <div key={node.id}>
              <Link
                href={`${node.uri}`}
                className="flex flex-col p-4 border border-gray-200 rounded hover:bg-gray-50"
              >
                <div>{node.name}</div>
                <p>{node.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
