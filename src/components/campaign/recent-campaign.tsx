"use client";

import { useState } from "react";
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

interface Coupon {
  id: string;
  couponCode: string;
  firstName: string;
  lastName: string;
  dateGrabbed: string;
  redeemedStatus: "Not Redeemed" | "Redeemed" | "Expired";
  redeemedDate?: string;
  expiredDate?: string;
}

const initialData: Coupon[] = [
  {
    id: "01",
    couponCode: "001234-83B8B80-AAUUSUUSuuuuus",
    firstName: "Adebowale",
    lastName: "Akinfaderin",
    dateGrabbed: "2020-02-29T00:15:00",
    redeemedStatus: "Not Redeemed",
  },
  {
    id: "02",
    couponCode: "001234-83B8B80-AAUUSUUSuuuuus",
    firstName: "Adebowale",
    lastName: "Akinfaderin",
    dateGrabbed: "2020-02-29T00:15:00",
    redeemedStatus: "Redeemed",
    redeemedDate: "2020-02-29T00:15:00",
  },
  {
    id: "03",
    couponCode: "001234-83B8B80-AAUUSUUSuuuuus",
    firstName: "Adebowale",
    lastName: "Akinfaderin",
    dateGrabbed: "2020-02-29T00:15:00",
    redeemedStatus: "Expired",
    expiredDate: "2020-02-29T00:15:00",
  },
  {
    id: "04",
    couponCode: "001234-83B8B80-AAUUSUUSuuuuus",
    firstName: "Adebowale",
    lastName: "Akinfaderin",
    dateGrabbed: "2020-02-29T00:15:00",
    redeemedStatus: "Expired",
    expiredDate: "2020-02-29T00:15:00",
  },
];

export default function RecentCampaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<Coupon[]>(initialData);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
      status !== "Not Redeemed"
        ? format(new Date(redeemedDate), "MMM dd yyyy HH:mm")
        : "";

    return (
      <div className="flex flex-col gap-1">
        <h1
          className={cn(
            "font-semibold",
            status === "Redeemed" && "text-[#FED035]",
            status === "Expired" && "text-c-red",
            status === "Not Redeemed" && "text-c-green"
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
        <Button
          variant="outline"
          size="lg"
          className="h-[50px] justify-between gap-4 font-medium text-[#1D1B23] "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_8753_954)">
              <path
                d="M13.8081 16.7943C13.7862 16.7943 13.7642 16.7936 13.742 16.7921C13.3295 16.7656 12.9786 16.4944 12.8481 16.1013L10.7518 9.76229L8.9761 13.954C8.82837 14.3028 8.50225 14.538 8.12511 14.5677C7.74779 14.5971 7.38954 14.416 7.18926 14.0947L5.2676 11.0199C4.97865 10.5575 5.1192 9.94844 5.58161 9.65948C6.04397 9.37056 6.65308 9.51102 6.94208 9.97348L7.88125 11.4763L9.93305 6.63274C10.0962 6.24752 10.4859 6.00016 10.9038 6.01676C11.3214 6.03364 11.6905 6.31214 11.822 6.7097L13.9742 13.2176L15.4731 10.1122C15.6678 9.72513 16.0638 9.48912 16.4915 9.50268L18.6902 9.53126C19.2354 9.53835 19.6716 9.98609 19.6646 10.5313C19.6575 11.0765 19.2095 11.5131 18.6645 11.5056L17.0033 11.4841L14.7163 16.2227C14.5465 16.575 14.1948 16.7943 13.8081 16.7943ZM12.9383 15.3639C12.9381 15.3642 12.9379 15.3646 12.9378 15.3649L12.9383 15.3639ZM8.86324 13.0475L8.86436 13.0493C8.864 13.0487 8.8636 13.0481 8.86324 13.0475ZM19.3125 19.6311C19.3125 19.0858 18.8705 18.6438 18.3253 18.6438H6.01574C4.16355 18.6438 2.65669 17.1376 2.65669 15.2864V7.47924C2.65669 5.62796 4.16355 4.12186 6.01574 4.12186H18.3253C20.1774 4.12186 21.6843 5.628 21.6843 7.47924V15.2864C21.6843 15.7028 21.6092 16.1087 21.4612 16.4928C21.2652 17.0016 21.5187 17.5729 22.0274 17.769C22.5364 17.9652 23.1076 17.7116 23.3037 17.2028C23.5393 16.5913 23.6588 15.9465 23.6588 15.2864V7.47924C23.6588 4.53916 21.2662 2.14729 18.3252 2.14729H6.01574C3.07476 2.14725 0.682129 4.53916 0.682129 7.4792V15.2864C0.682129 18.2264 3.07476 20.6183 6.01574 20.6183H18.3253C18.8706 20.6183 19.3125 20.1763 19.3125 19.6311Z"
                fill="#FED035"
              />
              <path
                d="M21.1909 20.2793C21.7362 20.2793 22.1782 19.8373 22.1782 19.292C22.1782 18.7467 21.7362 18.3047 21.1909 18.3047C20.6456 18.3047 20.2036 18.7467 20.2036 19.292C20.2036 19.8373 20.6456 20.2793 21.1909 20.2793Z"
                fill="#FED035"
              />
            </g>
            <defs>
              <clipPath id="clip0_8753_954">
                <rect
                  width="22.9767"
                  height="22.9767"
                  fill="white"
                  transform="translate(0.682129 0.232559)"
                />
              </clipPath>
            </defs>
          </svg>
          See All Coupons
        </Button>
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
                  {row.couponCode}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.firstName}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {row.lastName}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  {format(new Date(row.dateGrabbed), "MMM dd yyyy HH:mm")}
                </TableCell>
                <TableCell className=" p-5 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <DisplayRedeemedDate
                      redeemedDate={row.redeemedDate || row.expiredDate || ""}
                      status={row.redeemedStatus}
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
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Copy code</DropdownMenuItem>
                      {row.redeemedStatus === "Not Redeemed" && (
                        <DropdownMenuItem>Mark as redeemed</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
