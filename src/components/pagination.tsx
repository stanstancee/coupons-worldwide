"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current page
      ) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} from {totalItems} data
      </p>
      <div className="flex items-center gap-1">
        <Button
          
          className=""
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
            <ChevronsLeft className="h-4 w-4" />
            <span className="">Previous page</span>


        </Button>
        {getPageNumbers().map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            className="h-9 w-9 px-0"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button

          className=""
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
           <span className="">Next page</span>
          <ChevronsRight className="h-4 w-4" />

        </Button>
      </div>
    </div>
  );
}
