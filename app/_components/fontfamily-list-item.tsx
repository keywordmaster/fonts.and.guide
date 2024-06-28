import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GetFontfamiliesClientQuery } from "@/gql/graphql";

interface Props {
  fontfamily: GetFontfamiliesClientQuery["fontfamilies"]["edges"][0]["node"];
}
const FontfamilyListItem = ({
  fontfamily: { id, featuredImage, specs, uri, fontAuthors, fontCategories },
}: Props) => {
  return (
    <li>
      <Link
        key={id}
        href={uri}
        prefetch
        className="flex justify-between aspect-[21/9] bg-background border border-border rounded-lg overflow-hidden gap-2 p-2 hover:shadow-lg transition-shadow duration-300 ease-in-out relative"
      >
        {featuredImage ? (
          <Image
            src={featuredImage.node.sourceUrl}
            // srcSet={featuredImage?.node.srcSet}
            alt={featuredImage?.node.altText}
            width={300}
            height={100}
            className="flex-1 object-cover w-1/2 h-full rounded-lg"
            aria-label={specs.fontName}
          />
        ) : (
          <div className="flex flex-col px-3">
            <div className="flex justify-between absolute left-0 right-5 top-4 text-sm">
              <p className="border-y pl-5 pr-5 ">{specs.fontName}</p>
              <Badge variant="secondary">{fontCategories.nodes[0].name}</Badge>
            </div>
            <div className="flex items-center flex-1 text-3xl">
              <span
                style={
                  specs.menuUrl && {
                    fontFamily: specs.fontNameEn,
                  }
                }
              >
                {specs.fontNameEn}
              </span>
            </div>
            <div className="flex gap-4 absolute left-0 right-0 text-xs bottom-0 border-t px-5 items-center min-h-8">
              <p>제조사: {fontAuthors.nodes.map((e) => e.name).join(", ")}</p>
              <p>라이센스: {specs.license}</p>
            </div>
          </div>
        )}
      </Link>
    </li>
  );
};

export default FontfamilyListItem;
