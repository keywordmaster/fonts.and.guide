export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";
import { GetFontsByConceptQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPostCategoryQueryToPathMetaData } from "@/utils/breadcrumbs";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const { data } = await getClient().query<GetFontsByConceptQuery>(
    gql`
      query GetFontsByConcept($id: ID!, $term: String!) {
        breadcrumbs: fontConcept(id: $id, idType: SLUG) {
          id
          name
          uri
          description
          ancestors {
            nodes {
              id
              uri
              name
            }
          }
        }
        fontfamilies(where: { taxQuery:  {
           taxArray: [ {
              field: SLUG
              includeChildren: true
              taxonomy: FONTCONCEPT
              terms: [$term]
           }]
        }}) {
          edges {
            cursor
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
    {
      id: decodeURI(slug[slug.length - 1]),
      term: slug[slug.length - 1],
    },
  );

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* <BreadcrumbsWithSchema
        pathMetaData={convertPostCategoryQueryToPathMetaData(data)}
        lastNodeType={LAST_NODE_TYPE.link}
      /> */}
      {/* <h1>{data.post?.title}</h1> */}
      <div className="overflow-x-scroll p-4 bg-muted/50">
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </>
  );
}
