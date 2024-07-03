export const runtime = "edge";

import { gql } from "@urql/core";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";
import { GetFontFamilyQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { decodeHtmlEntities } from "@/lib/utils";

type Props = {
  params: { uri: string[] };
};

const fontfamilyQuery = gql`
  query GetFontFamily($id: ID!) {
    breadcrumbs: fontfamily(id: $id, idType: URI) {
      fontConcepts {
        nodes {
          id
          name
          uri
          slug
          ancestors {
            nodes {
              id
              uri
              slug
              name
            }
          }
        }
      }
    }
    fontfamily(id: $id, idType: URI) {
      id
      title
      uri
      content
      date
      modified
      fontAuthors {
        nodes {
          id
          name
          uri
        }
      }
      fontCategories {
        nodes {
          id
          name
          uri
        }
      }
      fontConcepts {
        nodes {
          id
          name
          uri
        }
      }
      fontSubsets {
        nodes {
          id
          name
          uri
        }
      }
      fontUsages {
        nodes {
          id
          name
          uri
        }
      }
      fontVariants {
        nodes {
          id
          name
          uri
        }
      }
      specs {
        downloadLink
        fontName
        fontNameEn
        isGoogleFonts
        license
        menuUrl
        version
      }
    }
  }
`;

export async function generateMetadata(
  { params: { uri } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data, error } = await getClient().query<GetFontFamilyQuery>(
    fontfamilyQuery,
    {
      id: decodeURI(uri.join("/")),
    },
  );

  const parentMeta = await parent;

  return {
    ...parentMeta,
    title: data.fontfamily.specs.fontName,
    description: data.fontfamily.content
      ? decodeHtmlEntities(data.fontfamily.content).slice(0, 160)
      : parentMeta.description,
    openGraph: {
      ...parentMeta.openGraph,
      title: `${data.fontfamily.specs.fontName}`,
      description: data.fontfamily.content
        ? decodeHtmlEntities(data.fontfamily.content).slice(0, 160)
        : parentMeta.description,
      type: "article",
      publishedTime: data.fontfamily.date,
      modifiedTime: data.fontfamily.modified,
      url: `${process.env.NEXT_PUBLIC_URL}/fontfamily/${uri.join("/")}`,
      // images: [],
    },
  };
}

export default async function Page({ params: { uri } }: Props) {
  const { data } = await getClient().query<GetFontFamilyQuery>(
    fontfamilyQuery,
    {
      id: decodeURI(uri.join("/")),
    },
  );

  if (!data.fontfamily) {
    notFound();
  }

  return (
    <>
      <div className="flex-col items-start gap-8 md:flex">
        {data && (
          <div className="md:fixed">
            <BreadcrumbsWithSchema
              pathMetaData={[
                { path: "/", name: "Home" },
                { path: "/font-concept", name: "추천 폰트 컨셉" },
                ...data.breadcrumbs.fontConcepts.nodes[0].ancestors?.nodes
                  .reverse()
                  .map(({ name, uri }) => ({
                    path: uri,
                    name,
                  })),
              ]}
              lastNodeType={LAST_NODE_TYPE.link}
            />
            <hr className="my-4" />
            <h1 className="text-3xl font-bold">
              {data.fontfamily.specs.fontName}
            </h1>

            <p>{data.fontfamily.specs.downloadLink}</p>
            <p>{data.fontfamily.specs.fontNameEn}</p>
            <p>{data.fontfamily.specs.isGoogleFonts}</p>
            <p>{data.fontfamily.specs.license}</p>
            <p>{data.fontfamily.specs.version}</p>
          </div>
        )}
      </div>
      <div className="h-full min-h-[50vh] rounded-xl bg-muted/90 p-2 lg:col-span-2">
        <div className="overflow-x-scroll p-4 bg-muted/10">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: data.fontfamily.content }}
        />
      </div>
    </>
  );
}
