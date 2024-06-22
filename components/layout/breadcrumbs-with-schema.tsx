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
import GenerateBreadcrumbsSchema from "@/utils/generate-breadcrumbs-schema";

type BreadcrumbMetaData = {
  path: string;
  name: string;
};

interface Props {
  pathMetaData: BreadcrumbMetaData[];
}

const BreadcrumbsWithSchema = ({ pathMetaData }: Props) => {
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
                  {hasNextNode ? (
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
