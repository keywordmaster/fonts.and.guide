import { BreadcrumbItem } from "react-breadcrumbs-jsonld";

const GenerateBreadcrumbsSchema = (
  pathMetaData: [string, string][],
  baseURL = process.env.PRODUCT_URL,
): BreadcrumbItem[] => {
  return pathMetaData.map(([path, name]) => ({
    url: `${baseURL}${path}`,
    name,
  }));
};

export default GenerateBreadcrumbsSchema;
