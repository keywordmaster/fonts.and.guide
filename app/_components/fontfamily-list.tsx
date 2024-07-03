"use client";

import { gql, useQuery } from "@urql/next";
import { Suspense, useMemo, useState } from "react";

import {
  GetFontfamiliesClientQuery,
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  TaxonomyEnum,
  TaxQueryField,
} from "@/gql/graphql";

import FontfamilyFilter from "./fontfamily-filter";
import FontfamilyListItem from "./fontfamily-list-item";
import SortOrderSetter from "./sort-order";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const FontfamilyList: React.FC<Props> = ({ searchParams }) => {
  const [after, setAfter] = useState<string>();

  const isFiltered = [
    "font-category",
    "font-author",
    "font-usage",
    "font-concept",
    "font-subset",
    "font-variant",
  ].some((key) => Object.keys(searchParams).includes(key));

  const sanitizeSearchParams = (validator, searchParams, key: string) => {
    if (Object.values(validator).includes(searchParams[key])) {
      return searchParams[key];
    }

    // TODO: canonical URL 확인, 리다이렉트? 서치파람 제거?
    return null;
  };

  const field =
    sanitizeSearchParams(
      PostObjectsConnectionOrderbyEnum,
      searchParams,
      "field",
    ) || PostObjectsConnectionOrderbyEnum.Title;
  const order =
    sanitizeSearchParams(OrderEnum, searchParams, "order") || OrderEnum.Desc;

  const filters = isFiltered
    ? [
        "font-category",
        "font-author",
        "font-usage",
        "font-concept",
        "font-subset",
        "font-variant",
      ].reduce((acc, key) => {
        const taxEnum = key.replace("font-", "Font");

        if (searchParams[key]) {
          // TODO: ...dk
          const nomalizedSearchParams = Array.isArray(searchParams[key])
            ? Array.from(new Set((searchParams[key][0] as string).split(",")))
            : (searchParams[key] as string).split(",");

          return [
            ...acc,
            {
              field: TaxQueryField.Slug,
              terms: nomalizedSearchParams,
              includeChildren: true,
              taxonomy: TaxonomyEnum[taxEnum],
            },
          ];
        }

        return acc;
      }, [])
    : [];

  const [{ data, error }] = useQuery<GetFontfamiliesClientQuery>({
    query: gql`
      query GetFontfamiliesClient(
        $field: PostObjectsConnectionOrderbyEnum!
        $order: OrderEnum!
        $filters: [TaxArray]
      ) {
        fontfamilies(
          first: 1000
          where: {
            orderby: { field: $field, order: $order }
            taxQuery: { taxArray: $filters }
          }
        ) {
          edges {
            node {
              id
              title
              uri
              content
              modified
              commentCount
              featuredImage {
                node {
                  id
                  srcSet
                  sourceUrl
                  altText
                }
              }
              specs {
                id: fontName
                fontName
                fontNameEn
                downloadLink
                isGoogleFonts
                license
                menuUrl
                version
              }
              fontAuthors {
                nodes {
                  id
                  name
                }
              }
              fontCategories {
                nodes {
                  id
                  name
                }
              }
            }
          }
          pageInfo {
            total
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
        total: fontfamilies {
          pageInfo {
            total
          }
        }
      }
    `,
    variables: {
      after,
      field,
      order,
      filters,
    },
    context: useMemo(() => ({ suspense: !after }), [after]),
  });

  const fontStyles = useMemo(
    () =>
      data.fontfamilies.edges
        .map(
          ({ node }) =>
            node.specs.menuUrl &&
            `
    @font-face {
      font-family: ${node.specs.fontNameEn};
      src: url(${node.specs.menuUrl});
      font-display: swap;
    }`,
        )
        .join("\n"),
    [data.fontfamilies.edges],
  );

  return (
    <Suspense>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-zinc-500 border-y p-2 flex-1">
          {`총 ${data.total?.pageInfo.total}개 중 ${data.fontfamilies?.pageInfo.total}개 표시`}
        </p>
        <div className="flex items-center gap-2">
          <FontfamilyFilter />
          <SortOrderSetter />
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
        {data ? (
          <>
            {data.fontfamilies.edges.length === 0 && (
              <div className="col-span-full items-center justify-center text-center text-lg text-zinc-500">
                결과가 없습니다.
              </div>
            )}
            {data.fontfamilies.edges.map(({ node }) => (
              <FontfamilyListItem key={node.id} fontfamily={node} />
            ))}
          </>
        ) : (
          JSON.stringify(error)
        )}
      </ul>
    </Suspense>
  );
};

export default FontfamilyList;
