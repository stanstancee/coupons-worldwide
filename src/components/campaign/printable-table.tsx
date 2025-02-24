"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { useRef } from "react";
import { Button } from "../ui/button";

interface PrintableTableProps {
  data: any[];
}

export function PrintableTable({ data }: PrintableTableProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (contentRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        const content = contentRef.current.cloneNode(true) as HTMLElement;

        printWindow.document.write(`
          <html>
            <head>
              <title>Print Preview</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  padding: 20px;
                  margin: 0;
                }
                .print-container {
                  max-width: 1000px;
                  margin: 0 auto;
                }
                .print-header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .print-header h1 {
                  margin: 0;
                  color: #1D1B23;
                }
                .print-header p {
                  color: #666;
                  margin: 5px 0 0;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                  font-size: 14px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 12px;
                  text-align: left;
                }
                th {
                  background-color: #f5f5f5;
                  font-weight: 600;
                }
                tr:nth-child(even) {
                  background-color: #fafafa;
                }
                @media print {
                  body { 
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${content.innerHTML}
              </div>
              <script>
                window.onload = function() { 
                  window.print(); 
                  window.onafterprint = function() {
                    window.close();
                  }
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className=" h-[50px] justify-between gap-4 font-medium text-[#1D1B23]"
        onClick={handlePrint}
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

      <div ref={contentRef} className="hidden">
        <div className="print-header">
          <h1>Campaign Report</h1>
          <p>Generated on: {format(new Date(), "MMM dd yyyy HH:mm")}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Coupon Code</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date Grabbed</th>
              <th>Redeemed Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.code}</td>
                <td>{row.first_name || "-"}</td>
                <td>{row.last_name || "-"}</td>
                <td>{row.date_grabbed}</td>
                <td>{row.redeem_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
