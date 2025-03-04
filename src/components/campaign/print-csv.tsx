"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface PrintableTableProps {
  data: any[];
}

export function PrintableCSV({ data }: PrintableTableProps) {
  const handleDownloadCSV = () => {
    // Convert data to CSV format
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const csvRows: any = [];

    // Add header row
    csvRows.push(headers.join(","));

    // Add data rows
    for (const row of data) {
      const values = headers?.map((header) => {
        const value = row[header] || "-";
        // Escape quotes and wrap in quotes if the value contains commas or quotes
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    // Combine into CSV string
    const csvString = csvRows.join("\n");

    // Create a blob and download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set filename with current date
    const fileName = `campaign-report-${format(new Date(), "yyyy-MM-dd")}.csv`;

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="h-[50px] justify-between gap-4 font-medium text-[#1D1B23]"
        onClick={handleDownloadCSV}
      >
        <Download className="h-5 w-5 text-[#09BD3C]" />
        Download CSV
      </Button>
    </div>
  );
}
