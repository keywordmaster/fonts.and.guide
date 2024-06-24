import { Fragment } from "react";
import { BreadcrumbSchema } from "react-breadcrumbs-jsonld";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BreadcrumbMetaData,
  GenerateBreadcrumbsSchema,
} from "@/utils/breadcrumbs";

export const LAST_NODE_TYPE = {
  link: "link",
  page: "page",
} as const;

type BreadcrumbLastNodeType = keyof typeof LAST_NODE_TYPE;

interface Props {
  pathMetaData: BreadcrumbMetaData[];
  lastNodeType?: BreadcrumbLastNodeType;
}

const BreadcrumbsWithSchema = ({
  pathMetaData,
  lastNodeType = LAST_NODE_TYPE.page,
}: Props) => {
  const breadcrumbs = GenerateBreadcrumbsSchema(pathMetaData);

  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbList>
          {pathMetaData.map(({ path, name }, index) => {
            const hasNextNode = pathMetaData.length - 1 !== index;
            return (
              <Fragment key={name}>
                <BreadcrumbItem>
                  {hasNextNode || lastNodeType === LAST_NODE_TYPE.link ? (
                    <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {hasNextNode ? <BreadcrumbSeparator /> : null}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
    </Fragment>
  );
};

export default BreadcrumbsWithSchema;
