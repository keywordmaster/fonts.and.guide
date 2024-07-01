export const runtime = "edge";

import { Metadata } from "next";

import FontfamilyList from "./_components/fontfamily-list";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL,
  },
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <FontfamilyList searchParams={searchParams} />;
}
