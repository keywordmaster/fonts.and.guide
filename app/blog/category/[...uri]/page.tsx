export const runtime = "edge";

import { gql } from "@urql/core";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { GetPostsByCategoryQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { decodeHtmlEntities } from "@/lib/utils";

const postsByCategoryQuery = gql`
  query GetPostsByCategory($id: ID!, $category: String!) {
    posts(first: 100, where: { categoryName: $category }) {
      nodes {
        id
        title
        uri
        slug
      }
    }
    category(id: $id, idType: SLUG) {
      id
      name
      description
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
  const { data, error } = await getClient().query<GetPostsByCategoryQuery>(
    postsByCategoryQuery,
    {
      id: decodeURI(uri.at(-1)),
      category: decodeURI(uri.join("/")),
    },
  );

  const parentMeta = await parent;

  return {
    ...parentMeta,
    title: `블로그 카테고리: ${data.category.name}`,
    description: data.category.description
      ? decodeHtmlEntities(data.category.description).slice(0, 160)
      : parentMeta.description,
    openGraph: {
      ...parentMeta.openGraph,
      title: `${data.category.name}`,
      description: data.category.description
        ? decodeHtmlEntities(data.category.description).slice(0, 160)
        : parentMeta.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_URL}/${uri.join("/")}`,
      // images: [],
    },
  };
}

export default async function Page({ params: { uri } }) {
  const { data, error } = await getClient().query<GetPostsByCategoryQuery>(
    postsByCategoryQuery,
    {
      id: decodeURI(uri.at(-1)),
      category: decodeURI(uri.join("/")),
    },
  );
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">
          블로그 카테고리: {data.category.name}
        </h1>
        <p>{data.category.description}</p>
      </div>
      <ul>
        {data
          ? data.posts.nodes.map((node) => (
              <li key={node.id}>
                <Link key={node.id} href={`/blog${node.uri}`} prefetch>
                  {node.title}
                </Link>
              </li>
            ))
          : JSON.stringify(error)}
      </ul>
    </>
  );
}
