import { BreadcrumbItem } from "react-breadcrumbs-jsonld";

const GenerateBreadcrumbsSchema = (
  pathMetaData: [string, string][],
  baseURL = "https://example.com",
): BreadcrumbItem[] => {
  return pathMetaData.map(([path, name]) => ({
    url: `${baseURL}${path}`,
    name,
  }));
};

export default GenerateBreadcrumbsSchema;
