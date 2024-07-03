import { convertPageQueryToPathMetaData } from "@/utils/breadcrumbs";

export const runtime = "edge";

import { gql } from "@urql/core";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema from "@/components/layout/breadcrumbs-with-schema";
import { GetPageQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { decodeHtmlEntities } from "@/lib/utils";

const pageQuery = gql`
  query GetPage($id: ID!) {
    breadcrumbs: page(id: $id, idType: URI) {
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
    page(id: $id, idType: URI) {
      id
      title
      content
      date
    }
  }
`;

type Props = {
  params: { uri: string[] };
};

export async function generateMetadata(
  { params: { uri } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data, error } = await getClient().query<GetPageQuery>(pageQuery, {
    id: decodeURI(uri.join("/")),
  });

  const parentMeta = await parent;

  return {
    ...parentMeta,
    title: data.page.title,
    description: data.page.content
      ? decodeHtmlEntities(data.page.content).slice(0, 160)
      : parentMeta.description,
    openGraph: {
      ...parentMeta.openGraph,
      title: `${data.page.title}`,
      description: data.page.content
        ? decodeHtmlEntities(data.page.content).slice(0, 160)
        : parentMeta.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_URL}/${uri.join("/")}`,
      // images: [],
    },
  };
}
export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetPageQuery>(pageQuery, {
    id: decodeURI(uri.join("/")),
  });

  if (!data.page) {
    notFound();
  }

  return (
    <>
      <BreadcrumbsWithSchema
        pathMetaData={convertPageQueryToPathMetaData(data)}
      />
      <h1>{data.page?.title}</h1>
      <div className="overflow-x-scroll p-4 bg-muted/50">
        <pre>{JSON.stringify(data.breadcrumbs)}</pre>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.page?.content }} />
    </>
  );
}
