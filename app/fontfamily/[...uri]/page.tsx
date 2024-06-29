export const runtime = "edge";

import { gql } from "@urql/core";
import { notFound } from "next/navigation";

import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";
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
            <hr className="my-2" />
            <h1 className="text-3xl">{data.fontfamily.specs.fontName}</h1>

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
