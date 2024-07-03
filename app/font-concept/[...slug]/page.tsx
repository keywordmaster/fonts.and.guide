export const runtime = "edge";

import { gql } from "@urql/core";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";
import { GetFontsByConceptQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { decodeHtmlEntities } from "@/lib/utils";
import { convertPostCategoryQueryToPathMetaData } from "@/utils/breadcrumbs";

const fontsByConceptQuery = gql`
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
    fontfamilies(
      where: {
        taxQuery: {
          taxArray: [
            {
              field: SLUG
              includeChildren: true
              taxonomy: FONTCONCEPT
              terms: [$term]
            }
          ]
        }
      }
    ) {
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
`;

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data, error } = await getClient().query<GetFontsByConceptQuery>(
    fontsByConceptQuery,
    {
      id: slug.at(-1),
      term: slug.at(-1),
    },
  );

  const parentMeta = await parent;

  return {
    ...parentMeta,
    title: `추천 폰트 컨셉: ${data.breadcrumbs.name}`,
    description: data.breadcrumbs.description
      ? decodeHtmlEntities(data.breadcrumbs.description).slice(0, 160)
      : parentMeta.description,
    openGraph: {
      ...parentMeta.openGraph,
      title: `${data.breadcrumbs.name}`,
      description: data.breadcrumbs.description
        ? decodeHtmlEntities(data.breadcrumbs.description).slice(0, 160)
        : parentMeta.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_URL}/${slug.join("/")}`,
      // images: [],
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const { data } = await getClient().query<GetFontsByConceptQuery>(
    fontsByConceptQuery,
    {
      id: slug.at(-1),
      term: slug.at(-1),
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
