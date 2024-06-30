import BreadcrumbsWithSchema, {
  LAST_NODE_TYPE,
} from "@/components/layout/breadcrumbs-with-schema";

import styles from "./page.module.css";

export const runtime = "edge";

import { gql } from "@urql/core";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";

import { GetPostQuery } from "@/gql/graphql";
import { getClient } from "@/lib/urql/client";
import { convertPostCategoryQueryToPathMetaData } from "@/utils/breadcrumbs";

import RedaingTime from "./_components/reading-time";
import ScrollIndicator from "./_components/scroll-indicator";
import ToC from "./_components/toc";

export default async function Page({
  params: { uri },
}: {
  params: { uri: string[] };
}) {
  const { data } = await getClient().query<GetPostQuery>(
    gql`
      query GetPost($id: ID!) {
        breadcrumbs: post(id: $id, idType: URI) {
          id
          categories {
            edges {
              node {
                id
                uri
                name
              }
            }
            nodes {
              id
              ancestors {
                nodes {
                  id
                  uri
                  name
                }
              }
            }
          }
        }
        post(id: $id, idType: URI) {
          __typename
          id
          title
          content
          modified
          date
          dateGmt
        }
      }
    `,
    {
      id: decodeURI(uri.reduce((acc, cur) => `${acc}/${cur}`)),
    },
  );

  if (!data.post) {
    notFound();
  }

  // TODO: 새로 추가된 컴포넌트의 레이아웃 재배치 필요
  return (
    <div className="relative container p-0">
      <div className="md:mr-64">
        <ScrollIndicator />
        <BreadcrumbsWithSchema
          pathMetaData={convertPostCategoryQueryToPathMetaData(data)}
          lastNodeType={LAST_NODE_TYPE.link}
        />
        <h1 className="text-2xl md:text-3xl font-bold my-4">{data.post?.title}</h1>
        <hr className="my-4" />
        <div className="flex gap-6 my-4">
          <div className="text-sm flex items-center gap-2">
            <Calendar className="size-3" /> 작성일 {dayjs(data.post.date).format("YYYY년 M월 D일")}
          </div>
          <RedaingTime content={data.post?.content} />
        </div>
        <article className={`font-sans ${styles.blogContent}`}
          dangerouslySetInnerHTML={{ __html: data.post?.content }} />
      </div>
      <div className="hidden md:flex fixed top-0 right-0 w-64 h-screen flex-col pt-[4.5rem]">
        <div className="flex-shrink-0">
          <ScrollIndicator />
        </div>
        <div className="flex-grow overflow-y-auto">
          <ToC />
        </div>
      </div>
    </div >
  );
}
