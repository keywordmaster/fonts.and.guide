"use client";

import { gql, useQuery } from "@urql/next";
import { ArchiveRestore, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GetFontfamilyFiltersQuery } from "@/gql/graphql";
import { camelToKebab, createQueryString } from "@/lib/utils";

import FilterSection from "./fontfamily-filter-section";

const terms = {
  fontAuthor: "제조사",
  fontCategory: "유형",
  fontConcept: "추천 컨셉",
  fontSubset: "서브셋",
  fontUsage: "사용범위",
  fontVariant: "종류",
};

const FontfamilyFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [oepn, setOpen] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({
    ...Object.keys(terms).reduce(
      (acc, key) => ({
        ...acc,
        [camelToKebab(key)]: searchParams.get(camelToKebab(key))
          ? searchParams.get(camelToKebab(key)).split(",")
          : [],
      }),
      {},
    ),
  });

  const [{ data }] = useQuery<GetFontfamilyFiltersQuery>({
    query: gql`
      query GetFontfamilyFilters {
        fontAuthor: terms(where: { taxonomies: [FONTAUTHOR] }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
        fontCategory: terms(where: { taxonomies: [FONTCATEGORY] }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
        fontConcept: terms(where: { taxonomies: [FONTCONCEPT], parent: 0 }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
        fontSubset: terms(where: { taxonomies: [FONTSUBSET] }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
        fontUsage: terms(where: { taxonomies: [FONTUSAGE] }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
        fontVariant: terms(where: { taxonomies: [FONTVARIANT], parent: 117 }) {
          nodes {
            id
            name
            uri
            slug
            taxonomyName
          }
        }
      }
    `,
    variables: {},
  });

  useEffect(() => {
    (() => {
      const newFilters = Object.keys(terms).reduce((acc, key) => {
        const paramValue = searchParams.get(camelToKebab(key));
        return {
          ...acc,
          [camelToKebab(key)]: paramValue ? paramValue.split(",") : [],
        };
      }, {});
      setFilters(newFilters);
    })();
  }, [searchParams]);

  const appendQueryString = useCallback(createQueryString, [searchParams]);

  const handleFilterUpdate = (node, filters, setFilters) => {
    const currentFilters = filters[node.taxonomyName] || [];
    if (currentFilters.includes(node.slug)) {
      setFilters({
        ...filters,
        [node.taxonomyName]: currentFilters.filter(
          (slug) => slug !== node.slug,
        ),
      });
    } else {
      setFilters({
        ...filters,
        [node.taxonomyName]: [...currentFilters, node.slug],
      });
    }
  };

  const handleFilterApply = () => {
    let newFilter = [];

    // TODO: 중복 제거 필요
    Object.keys(terms).forEach((key) => {
      const kebabKey = camelToKebab(key);
      if (filters[kebabKey]?.length > 0) {
        newFilter.push(
          appendQueryString(
            kebabKey,
            filters[kebabKey]?.join(","),
            searchParams,
          ),
        );
      }
    });

    router.push(pathname + "?" + newFilter.join("&"));
    setOpen(false);
  };

  const handleFilterReset = () => {
    setFilters({});
  };

  return (
    <>
      <Drawer open={oepn} onOpenChange={setOpen}>
        <DrawerTrigger asChild className="flex-grow">
          <Button variant="outline" className="">
            <Filter className="size-5" />
            <span className="px-4 sm:px-6">필터</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <div className="overflow-y-scroll">
            <DrawerHeader>
              <DrawerTitle>필터 적용하기</DrawerTitle>
              <DrawerDescription>
                원하시는 조건을 선택 후 적용하기 버튼을 눌러주세요.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 top-0 sticky flex items-center gap-4 justify-between">
              <Button className="w-48" onClick={handleFilterApply}>
                적용하기
              </Button>
              <Button className="w-32 gap-4" onClick={handleFilterReset}>
                <ArchiveRestore />
                초기화
              </Button>
            </div>
            <div className="grid w-full items-start gap-6 p-4 pb-12">
              {Object.keys(data).map((key) => (
                <FilterSection
                  key={key}
                  filterName={terms[key]}
                  nodes={data[key].nodes}
                  currentFilters={filters}
                  updateFilters={(node) =>
                    handleFilterUpdate(node, filters, setFilters)
                  }
                />
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FontfamilyFilter;
