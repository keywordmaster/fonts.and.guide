import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { GetFontfamiliesClientQuery } from "@/gql/graphql";

interface Props {
  fontfamily: GetFontfamiliesClientQuery["fontfamilies"]["edges"][0]["node"];
}
const FontfamilyListItem = ({
  fontfamily: {
    id,
    modified,
    featuredImage,
    fontSpecFields,
    commentCount,
    title,
    uri,
  },
}: Props) => {
  console.log({ featuredImage, fontSpecFields });

  return (
    <Link
      key={id}
      href={uri}
      prefetch
      role="listitem"
      className="flex justify-between aspect-[21/9] bg-background border border-border rounded-lg overflow-hidden gap-2 p-2 hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      {featuredImage ? (
        <Image
          src={featuredImage.node.sourceUrl}
          // srcSet={featuredImage?.node.srcSet}
          alt={featuredImage?.node.altText}
          width={300}
          height={100}
          className="flex-1 object-cover w-1/2 h-full rounded-lg"
        />
      ) : (
        <div className="flex items-center flex-1 pl-3 pr-2 text-3xl">
          <span
            style={{
              fontFamily: title,
            }}
          >
            {title}
          </span>
        </div>
      )}
    </Link>
  );
};

export default FontfamilyListItem;
