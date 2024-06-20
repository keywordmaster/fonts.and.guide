"use client";

import { ArrowDownNarrowWide, ArrowUpNarrowWide, Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { OrderEnum, PostObjectsConnectionOrderbyEnum } from "@/gql/graphql";
import { cn } from "@/lib/utils";

const sortFields = [
	{
		value: PostObjectsConnectionOrderbyEnum.Title,
		label: "가나다",
	},
	{
		value: PostObjectsConnectionOrderbyEnum.Date,
		label: "업데이트",
	},
	{
		value: PostObjectsConnectionOrderbyEnum.MenuOrder,
		label: "인기순",
	},
];

const SortOrderSetter: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isAsc = searchParams.get("order") === OrderEnum.Asc;

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(PostObjectsConnectionOrderbyEnum.Title);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[120px] justify-between"
				>
					{searchParams.get("field")
						? sortFields.find(
							(field) => field.value === searchParams.get("field"),
						)?.label // TODO: 기본값 가나다로 반영 필요
						: "Select..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<Button
				size="icon"
				onClick={() => {
					if (isAsc) {
						router.push(
							pathname + "?" + createQueryString("order", OrderEnum.Desc),
						);

						return;
					}

					router.push(
						pathname + "?" + createQueryString("order", OrderEnum.Asc),
					);
				}}
			>
				{
					// TODO: 기본값 Asc로 반영 필요
					isAsc ? (
						<ArrowUpNarrowWide className="size-5" />
					) : (
						<ArrowDownNarrowWide className="size-5" />
					)
				}
			</Button>
			<PopoverContent className="w-[120px] p-0">
				{sortFields.map((field) => (
					<Button
						key={field.value}
						onClick={() => {
							setValue(field.value);
							router.push(
								pathname + "?" + createQueryString("field", field.value),
							);
							setOpen(false);
						}}
						variant="outline"
						className={cn(
							"flex items-center justify-between w-full px-4 py-2",
							value === field.value && "bg-gray-100",
						)}
					>
						{field.label}
						{value === field.value && <Check className="size-4" />}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};

export default SortOrderSetter;
