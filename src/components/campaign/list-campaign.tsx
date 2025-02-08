"use client";

import { useState, useMemo } from "react";
import { Ellipsis, Search } from "lucide-react";
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
import { useDashboard } from "@/context/dashboard-context";
import { SlidersHorizontal } from "lucide-react";
import Pagination from "../pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { setParams } from "@/utils/urlParams";

// import { Badge } from "@/components/ui/badge";

export default function ListCampaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { campaignDetails } = useDashboard();

  const data = useMemo(() => campaignDetails?.coupons || [], [campaignDetails]);

  const filteredData = useMemo(() => {
    let result = data;
    if (searchQuery.trim()) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (campaign) =>
          campaign.redeem_status?.toLowerCase() === statusFilter?.toLowerCase()
      );
    }
    return result;
  }, [data, searchQuery, statusFilter]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const newUrl = setParams(pathname, searchParams, { page: page.toString() });
    router.push(newUrl);
  };

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case "Not Redeemed":
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="bg-green-50 text-green-600 border-green-600"
  //         >
  //           Not Redeemed
  //         </Badge>
  //       );
  //     case "Redeemed":
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="bg-blue-50 text-blue-600 border-blue-600"
  //         >
  //           Redeemed
  //         </Badge>
  //       );
  //     case "Expired":
  //       return (
  //         <Badge
  //           variant="outline"
  //           className="bg-red-50 text-red-600 border-red-600"
  //         >
  //           Expired
  //         </Badge>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const DisplayRedeemedDate = ({
    redeemedDate,
    status,
  }: {
    redeemedDate: string;
    status: string;
  }) => {
    const date =
      status?.toLowerCase() !== "not redeemed"
        ? format(new Date(redeemedDate), "MMM dd yyyy HH:mm")
        : "";

    return (
      <div className="flex flex-col gap-1">
        <h1
          className={cn(
            "font-semibold",
            status?.toLowerCase() === "redeemed" && "text-[#FED035]",
            status?.toLowerCase() === "expired" && "text-c-red",
            status?.toLowerCase() === "not redeemed" && "text-c-green"
          )}
        >
          {status}
        </h1>

        {status !== "Not Redeemed" && (
          <span
            className={cn(
              "text-xs text-[#1D1B23]",
              status === "Expired" && "text-c-red"
            )}
          >
            {date}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full  ">
      <div className="flex items-center justify-between py-4">
        <div className="relative ">
          <Input
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 md:w-[551px]  shadow-md pr-9 h-[50px] bg-white"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 " />
        </div>

        <div className="flex items-center gap-4 ">
          <Button
            variant="outline"
            size="lg"
            className="h-[50px] justify-between gap-4 font-medium text-[#1D1B23] "
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_8753_850)">
                <path
                  d="M13.113 16.4542C13.0914 16.4542 13.0695 16.4535 13.0476 16.4521C12.6393 16.4258 12.2919 16.1574 12.1627 15.7682L10.0875 9.493L8.32967 13.6425C8.18342 13.9879 7.86058 14.2207 7.48724 14.2501C7.11371 14.2791 6.75907 14.0999 6.5608 13.7818L4.65848 10.738C4.37243 10.2802 4.51157 9.67727 4.96932 9.39122C5.42703 9.10521 6.03001 9.24426 6.31611 9.70206L7.24583 11.1897L9.27698 6.39494C9.43847 6.01359 9.8243 5.76872 10.238 5.78516C10.6514 5.80186 11.0167 6.07756 11.1469 6.47112L13.2774 12.9135L14.7613 9.83942C14.954 9.45621 15.3461 9.22258 15.7694 9.236L17.946 9.2643C18.4857 9.27132 18.9176 9.71454 18.9106 10.2543C18.9036 10.7939 18.4601 11.2262 17.9206 11.2188L16.2761 11.1975L14.0121 15.8884C13.844 16.2371 13.4959 16.4542 13.113 16.4542ZM12.252 15.0382C12.2518 15.0386 12.2516 15.0389 12.2515 15.0392L12.252 15.0382ZM8.21794 12.7451L8.21905 12.7469C8.21869 12.7463 8.21829 12.7457 8.21794 12.7451ZM18.5621 19.2625C18.5621 18.7227 18.1245 18.2851 17.5848 18.2851H5.39909C3.56554 18.2851 2.07384 16.7941 2.07384 14.9615V7.23292C2.07384 5.40026 3.56554 3.90932 5.39909 3.90932H17.5848C19.4183 3.90932 20.91 5.40031 20.91 7.23292V14.9615C20.91 15.3737 20.8357 15.7755 20.6892 16.1558C20.4951 16.6594 20.746 17.2251 21.2497 17.4192C21.7535 17.6133 22.319 17.3623 22.5131 16.8586C22.7464 16.2533 22.8647 15.615 22.8647 14.9615V7.23292C22.8647 4.32242 20.4961 1.95462 17.5847 1.95462H5.39909C2.4877 1.95458 0.119141 4.32242 0.119141 7.23288V14.9615C0.119141 17.872 2.4877 20.2398 5.39909 20.2398H17.5848C18.1246 20.2398 18.5621 19.8022 18.5621 19.2625Z"
                  fill="#FED035"
                />
                <path
                  d="M20.4217 19.9042C20.9615 19.9042 21.399 19.4666 21.399 18.9269C21.399 18.3871 20.9615 17.9495 20.4217 17.9495C19.8819 17.9495 19.4443 18.3871 19.4443 18.9269C19.4443 19.4666 19.8819 19.9042 20.4217 19.9042Z"
                  fill="#FED035"
                />
              </g>
              <defs>
                <clipPath id="clip0_8753_850">
                  <rect
                    width="22.7456"
                    height="22.7456"
                    fill="white"
                    transform="translate(0.119141 0.0591736)"
                  />
                </clipPath>
              </defs>
            </svg>
            View analytics
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-[50px] justify-between gap-4 font-medium text-[#1D1B23] "
          >
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.6938 14.1408C23.6938 17.2629 21.3585 19.8029 18.4879 19.8029H5.56652C3.02 19.8029 0.948242 17.5549 0.948242 14.7919C0.948242 13.7852 1.2247 12.8128 1.74771 11.9797C2.10511 11.4105 2.55971 10.9325 3.08601 10.5679C2.92973 9.91064 2.85083 9.23365 2.85083 8.5463C2.85083 6.42359 3.60099 4.423 4.9631 2.91304C6.35045 1.37514 8.20337 0.527425 10.1805 0.526093H10.1852C12.1055 0.526093 13.9234 1.33743 15.3046 2.81104C16.6627 4.25992 17.4477 6.19338 17.515 8.25532C17.5174 8.32969 17.5189 8.40419 17.5194 8.47873H18.4878C19.0276 8.47873 19.4652 8.91632 19.4652 9.45608C19.4652 9.99584 19.0276 10.4334 18.4878 10.4334H16.5051C16.206 10.4334 15.9234 10.2965 15.7381 10.0619L15.727 10.048C15.5654 9.84498 15.4911 9.58607 15.5206 9.32827C15.5586 8.99548 15.5723 8.65594 15.5613 8.31911C15.4562 5.09924 13.0446 2.48079 10.1851 2.48079C10.1839 2.48079 10.1831 2.48079 10.1819 2.48079C7.21731 2.48283 4.80548 5.20381 4.80548 8.54635C4.80548 9.29597 4.92578 10.0281 5.16297 10.7225C5.32725 11.2034 5.09558 11.73 4.63 11.9338C3.59703 12.386 2.90294 13.5346 2.90294 14.7919C2.90294 16.4771 4.09779 17.8482 5.56652 17.8482H18.4879C20.2806 17.8482 21.7391 16.185 21.7391 14.1408C21.7391 13.6568 21.6572 13.1856 21.4957 12.7401C21.3117 12.2326 21.574 11.6721 22.0814 11.4881C22.5888 11.3042 23.1494 11.5664 23.3334 12.0739C23.5726 12.7335 23.6938 13.429 23.6938 14.1408ZM10.0964 8.43733V12.4759C9.55011 11.8572 8.9143 10.8017 7.98679 11.536C7.57911 11.8898 7.53544 12.5071 7.88924 12.9147C7.88924 12.9147 10.3314 15.7289 10.3314 15.7288C10.6832 16.1498 11.3788 16.1775 11.7588 15.7796C11.8211 15.725 14.0961 13.0987 14.1556 13.0381C14.9842 12.0553 13.5435 10.8001 12.6827 11.7529L12.0512 12.4767V8.43733C12.0512 7.89757 11.6136 7.45998 11.0738 7.45998C10.5341 7.45998 10.0964 7.89757 10.0964 8.43733Z"
                fill="#09BD3C"
              />
              <path
                d="M21.0731 11.2192C21.6128 11.2192 22.0504 10.7816 22.0504 10.2418C22.0504 9.70204 21.6128 9.26447 21.0731 9.26447C20.5333 9.26447 20.0957 9.70204 20.0957 10.2418C20.0957 10.7816 20.5333 11.2192 21.0731 11.2192Z"
                fill="#09BD3C"
              />
            </svg>
            Download PDF
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=" bg-white rounded-[.5rem] hover:bg-[#E5E5E5] w-[48px] h-[48px]">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Redeem Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("redeemed")}>
                Redeemed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("not redeemed")}>
                Not Redeemed
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
              <TableHead className="p-5">Coupon Code</TableHead>
              <TableHead className="p-5">First Name</TableHead>
              <TableHead className="p-5">Last Name</TableHead>
              <TableHead className="p-5">Date Grabbed</TableHead>
              <TableHead className="p-5">Redeemed Status</TableHead>
              <TableHead className="w-12 p-5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className=" p-5 pl-6 whitespace-nowrap">
                  {row.id}
                </TableCell>
                <TableCell className="font-medium p-5 whitespace-nowrap">
                  {row?.code}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.first_name || "-"}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.last_name || "-"}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row?.date_grabbed}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <DisplayRedeemedDate
                      redeemedDate={row.date_redeemed}
                      status={row.redeem_status}
                    />
                  </div>
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <Ellipsis className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="min-w-[200px] cursor-pointer"
                    >
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Copy code</DropdownMenuItem>
                      {row.redeem_status?.toLowerCase() === "not redeemed" && (
                        <DropdownMenuItem>Mark as redeemed</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className=" w-full gap-2 mt-4 xl:mt-6 px-4 md:px-6">
          <Pagination
            totalItems={campaignDetails?.total || 0}
            itemsPerPage={20}
            currentPage={campaignDetails?.current_page || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
