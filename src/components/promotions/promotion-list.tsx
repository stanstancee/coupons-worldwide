"use client";

import { useState } from "react";
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

interface Promotion {
  id: string;
  campaign: string;
  displaySpace: string;
  amount: number;
  slots: number;
  startDate: string;
  status: "Live" | "Expired";
  expiryDate?: string;
}

const initialData: Promotion[] = [
  {
    id: "01",
    campaign: "Children Cloth at 50% discount at our...",
    displaySpace: "Category Display",
    amount: 500,
    slots: 4,
    startDate: "2020-02-29T00:15:00",
    status: "Live",
  },
  {
    id: "02",
    campaign: "Children Cloth at 50% discount at our...",
    displaySpace: "Homepage S2",
    amount: 500,
    slots: 20,
    startDate: "2020-02-29T00:15:00",
    status: "Expired",
    expiryDate: "2020-02-29T00:15:00",
  },
  {
    id: "03",
    campaign: "Children Cloth at 50% discount at our...",
    displaySpace: "Search Page",
    amount: 500,
    slots: 20,
    startDate: "2020-02-29T00:15:00",
    status: "Expired",
    expiryDate: "2020-02-29T00:15:00",
  },
  {
    id: "04",
    campaign: "Children Cloth at 50% discount at our...",
    displaySpace: "Featured",
    amount: 100,
    slots: 0,
    startDate: "2020-02-29T00:15:00",
    status: "Expired",
    expiryDate: "2020-02-29T00:15:00",
  },
  {
    id: "05",
    campaign: "Children Cloth at 50% discount at our...",
    displaySpace: "Featured",
    amount: 500,
    slots: 0,
    startDate: "2020-02-29T00:15:00",
    status: "Expired",
    expiryDate: "2020-02-29T00:15:00",
  },
];

export default function PromotionList() {
  const [open, setOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<Promotion[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const [filter, setFilter] = useState<"All" | "Live" | "Expired">("All");

  const filteredData = data.filter(
    (item) =>
      (filter === "All" || item.status === filter) &&
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

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
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-4">
          <Button
            className="h-[50px]"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <CustomWalletIcon className="h-4 w-4 mr-2 text-c-yellow" />
            Fund Wallet
          </Button>
          <Button
            className="h-[50px]"
            variant={"outline"}
            onClick={() => setOpen(true)}
          >
            <CustomChartIcon className="h-4 w-4 mr-2 text-c-yellow" />
            Run Promotion
          </Button>
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
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className=" p-5 pl-6 whitespace-nowrap">
                  {row.id}
                </TableCell>
                <TableCell className="font-medium p-5 whitespace-nowrap">
                  {row.campaign}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.displaySpace}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  ${row.amount} / {row.slots}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {format(new Date(row.startDate), "MMM dd yyyy HH:mm")}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <DisplayStatus
                    status={row.status}
                    expiryDate={row.expiryDate}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
        <WalletTopUp isOpen={open} setIsOpen={setOpen} />
    </div>
  );
}
