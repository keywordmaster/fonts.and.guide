import FontfamilyList from "./_components/fontfamily-list";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <FontfamilyList searchParams={searchParams} />;
}
