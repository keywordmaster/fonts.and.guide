"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootQueryToTermNodeConnection, TermNode } from "@/gql/graphql";

// type PartialNodeConnection = ;

interface Props {
  terms: { [key: string]: { nodes: Array<Partial<TermNode>> } };
}

const FontfamilyFilter = ({ terms }: Props) => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.values());
    const data = Object.fromEntries(formData);
    console.log(data);
    router.push(
      "?font-category=" +
        data["font-category"] +
        "&sort=" +
        data["sort"] +
        "&order=" +
        data["order"],
    );
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="flex-grow">
          <Button variant="outline" className="">
            <Filter className="size-5" />
            <span className="px-6">필터</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Configuration</DrawerTitle>
            <DrawerDescription>
              Configure the settings for the model and messages.
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={handleSubmit}
            className="grid w-full items-start gap-6 overflow-auto p-4 pt-0"
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>

              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  placeholder="0.4"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input
                  id="top-p"
                  name="top-p"
                  type="number"
                  placeholder="0.7"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </fieldset>
            <div className="overflow-scroll">
              <pre>{JSON.stringify(terms, null, null)}</pre>
            </div>
            <Button type="submit">Apply</Button>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FontfamilyFilter;
