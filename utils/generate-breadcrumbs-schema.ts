import { BreadcrumbItem } from "react-breadcrumbs-jsonld";

const GenerateBreadcrumbsSchema = (
  pathMetaData: [string, string][],
  baseURL = process.env.NEXT_PUBLIC_URL,
): BreadcrumbItem[] => {
  return pathMetaData.map(([path, name]) => ({
    url: `${baseURL}${path}`,
    name,
  }));
};

export default GenerateBreadcrumbsSchema;
