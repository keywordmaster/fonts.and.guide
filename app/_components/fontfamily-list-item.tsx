import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { GetFontfamiliesClientQuery } from "@/gql/graphql";

interface Props {
  fontfamily: GetFontfamiliesClientQuery["fontfamilies"]["edges"][0]["node"];
}
const FontfamilyListItem = ({ fontfamily }: Props) => {
  console.log(fontfamily);

  return (
    <Link
      key={fontfamily.id}
      href={fontfamily.uri}
      prefetch
      role="listitem"
      className="flex justify-between"
    >
      <span
        style={{
          fontFamily: fontfamily.title,
        }}
      >
        {fontfamily.title}
      </span>
      {fontfamily.featuredImage && (
        <Image
          src={fontfamily.featuredImage.node.sourceUrl}
          // srcSet={fontfamily.featuredImage?.node.srcSet}
          alt={fontfamily.featuredImage?.node.altText}
          width={100}
          height={100}
        />
      )}

      <span
        className={cx(`text-lg`)}
        style={
          {
            // fontFamily: fontfamily.fontSpecFields,
          }
        }
      >
        {fontfamily.modified}
      </span>
    </Link>
  );
};

export default FontfamilyListItem;
