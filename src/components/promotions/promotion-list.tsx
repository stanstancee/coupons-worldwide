"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CustomChartIcon, CustomWalletIcon } from "../icons/icons";
import Pagination from "../pagination";
import WalletTopUp from "./wallet-modal";

import Link from "next/link";
import { useDashboard } from "@/context/dashboard-context";
// import Cookies from "js-cookie";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setParams } from "@/utils/urlParams";

export default function PromotionList() {
  const [open, setOpen] = useState<boolean>(false);
  const { promotions, promotionData } = useDashboard();
  const currencySymbol =  "$"

  const [searchQuery, setSearchQuery] = useState("");


  const [, setFilter] = useState<"All" | "Live" | "Expired">("All");

  // const filteredData = data.filter(
  //   (item) =>
  //     (filter === "All" || item.status === filter) &&
  //     Object.values(item).some((value) =>
  //       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  // );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const newUrl = setParams(pathname, searchParams, { page: page.toString() });
    router.push(newUrl);
  };

  const data = useMemo(() => promotions || [], [promotions]);

  const DisplayStatus = ({
    status,
    expiryDate,
  }: {
    status: string;
    expiryDate?: string;
  }) => {
    return (
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            "font-semibold",
            status === "Live" && " text-c-green",
            status === "Expired" && " text-c-red"
          )}
        >
          {status}
        </span>
        {status === "Expired" && expiryDate && (
          <span className="text-xs text-c-red">
            {format(new Date(expiryDate), "MMM dd yyyy HH:mm")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full  ">
      <div className="flex md:items-center md:justify-between py-4 gap-3  flex-col md:flex-row">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative ">
            <Input
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 md:w-[551px]  shadow-md pr-9 h-[50px] bg-white"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 " />
          </div>
        </div>
        <div className="flex md:items-center gap-4 md:flex-1 md:flex-nowrap flex-wrap flex-1 md:justify-end">
          <Button
            className="h-[50px]"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <CustomWalletIcon className="h-4 w-4 mr-2 text-c-yellow" />
            Fund Wallet
          </Button>
          <Link href="/dashboard/promote/create">
            <Button className="h-[50px]" variant={"outline"}>
              <CustomChartIcon className="h-4 w-4 mr-2 text-c-yellow" />
              Run Promotion
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-[50px]">
                <SlidersHorizontal className="h-4 w-4 mr-2 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("All")}>
                All Promotions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Live")}>
                Live
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("Expired")}>
                Expired
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" border shadow-cards bg-white rounded-[10px] py-4 md:py-6">
        <Table>
          <TableHeader className="text-left font-semibold text-[#1D1B23] border-b ">
            <TableRow>
              <TableHead className=" p-5 pl-6">ID</TableHead>
              <TableHead className="p-5">Campaign</TableHead>
              <TableHead className="p-5">Display Space</TableHead>
              <TableHead className="p-5">Amount/Slots</TableHead>
              <TableHead className="p-5">Start Date</TableHead>
              <TableHead className="p-5">Promotion Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className=" p-5 pl-6 whitespace-nowrap">
                  {row.id}
                </TableCell>
                <TableCell className="font-medium p-5 whitespace-nowrap">
                  {row.campaign}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.display_space}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {currencySymbol}{" "}
                  {new Intl.NumberFormat().format(parseFloat(row.total_amount))}{" "}
                  / {row.slots}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {format(new Date(row.start_date), "MMM dd yyyy HH:mm")}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <DisplayStatus
                    status={row.status}
                    expiryDate={row.end_date}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination
          totalItems={promotionData?.total || 0}
          itemsPerPage={20}
          currentPage={promotionData?.current_page || 0}
          onPageChange={handlePageChange}
        />
      </div>
      <WalletTopUp isOpen={open} setIsOpen={setOpen} />
    </div>
  );
}
