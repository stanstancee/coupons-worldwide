"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { campaignService } from "../services/campaign-service";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ActionDropdown from "./action";
import Pagination from "../pagination";
import { useRouter } from "next/navigation";

export default function CampaignTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "views" | "grabs">(
    "newest"
  );

  const campaigns = useMemo(() => campaignService.getCampaigns(), []);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCampaigns = useMemo(() => {
    let result = campaigns;

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((campaign) => campaign.status === statusFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "views":
        return result.sort((a, b) => b.views - a.views);
      case "grabs":
        return result.sort((a, b) => b.grabs - a.grabs);
      case "oldest":
        return result.sort((a, b) => Number(a.id) - Number(b.id));
      default:
        return result.sort((a, b) => Number(b.id) - Number(a.id));
    }
  }, [campaigns, searchQuery, statusFilter, sortBy]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  //totalItems, itemsPerPage, currentPage, onPageChange
  const totalItems = campaigns.length;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  return (
    <div className="w-full  mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-[305px] bg-white ">
          <Input
            placeholder="Search campaign "
            className="pr-9 py-5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 " />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=" bg-white rounded-[.5rem] hover:bg-[#E5E5E5] w-[48px] h-[w-48px]">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Closed")}>
                Closed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select
            value={sortBy}
            onValueChange={(value: "newest" | "oldest" | "views" | "grabs") =>
              setSortBy(value)
            }
          >
            <SelectTrigger className="w-[180px] bg-white">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
              <SelectItem value="grabs">Most Grabs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className=" border border-[#ECEEF6] shadow-cards bg-white rounded-[12px] ">
        <Table>
          <TableHeader>
            <TableRow className="text-left font-semibold text-[#717171] border-b ">
              <TableHead className=" p-5 pl-6">Campaign</TableHead>
              <TableHead className="p-5">Views</TableHead>
              <TableHead className=" p-5">Grabs</TableHead>
              <TableHead className=" p-5">Redeemed</TableHead>
              <TableHead className=" p-5">Quantity</TableHead>
              <TableHead className=" p-5">Reviews</TableHead>
              <TableHead className=" p-5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCampaigns.map((campaign, index) => (
              <TableRow
                key={index}
                className="border-none cursor-auto"
                onClick={() =>
                  router.push(`/dashboard/campaign/${campaign.id}`)
                }
              >
                <TableCell className=" p-5 pl-6 whitespace-nowrap font-semibold">
                  {campaign.name}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {formatNumber(campaign.views)}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {formatNumber(campaign.grabs)}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {formatNumber(campaign.redeemed)}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {campaign.quantity.used} / {campaign.quantity.total}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {campaign.reviews}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <div className="flex justify-between items-center gap-3">
                    <Button className="bg-white rounded-[12.13px] hover:bg-[#E5E5E5]">
                      <Image
                        src={
                          campaign.status === "Active"
                            ? "/svg/red.svg"
                            : "/svg/green.svg"
                        }
                        alt="status"
                        width={24}
                        height={24}
                      />
                      <span className="text-[#1D1B23] font-medium">
                        {campaign.status === "Active" ? "Active" : "Closed"}
                      </span>
                    </Button>
                    <ActionDropdown />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
