"use client";

import { gql, useQuery } from "@urql/next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const [after, setAfter] = useState<string>();

  // TODO: 텀 종류 추가될 때마다 추가
  const isFiltered = ["font-category"].some((key) =>
    Object.keys(searchParams).includes(key),
  );

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
  // TODO: 텀 종류만큼 어레이 채우기
  const filters = isFiltered
    ? [
        {
          field: TaxQueryField.Slug,
          // TODO: searchParams KV 값 형태로 어레이가 넘어오는지 확인하기
          terms: (searchParams["font-category"] as string)?.split(","),
          includeChildren: true,
          taxonomy: TaxonomyEnum.Fontcategory,
        },
      ]
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
              fontSpecFields {
                id: menuUrl
                downloadLink
                fontName
                isGoogleFonts
                license
                menuUrl
                version
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
        fontCategory: terms(where: { taxonomies: [FONTCATEGORY] }) {
          nodes {
            __typename
            id
            name
            uri
          }
        }
        fontVariants: terms(where: { taxonomies: [CATEGORY] }) {
          nodes {
            id
            name
            slug
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

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: data.fontfamilies.edges
            .map(({ node }) => {
              return `
            @font-face {
              font-family: ${node.title};
              src: url(${node.fontSpecFields.menuUrl});
            }`;
            })
            .join("\n"),
        }}
      />
      <div className="flex items-center justify-between gap-4">
        <FontfamilyFilter
          terms={{
            [`${data.fontCategory.nodes[0].__typename}`]: data.fontCategory,
          }}
        />
        <p className="text-sm text-zinc-700 border-y p-2 flex-1">
          결과: {data.fontfamilies?.pageInfo.total} / 전체:{" "}
          {data.total?.pageInfo.total}
        </p>
        <SortOrderSetter />
      </div>
      <ul>
        {data
          ? data.fontfamilies.edges.map(({ node }) => (
              <FontfamilyListItem key={node.id} fontfamily={node} />
            ))
          : JSON.stringify(error)}
      </ul>

      <div className="overflow-scroll">
        <pre>{JSON.stringify(data.fontCategory, null, 2)}</pre>
      </div>

      <Button
        onClick={() => {
          router.push("?font-category=serif,sans-serif");
        }}
      >
        TEST Filter
      </Button>
    </>
  );
};

export default FontfamilyList;
