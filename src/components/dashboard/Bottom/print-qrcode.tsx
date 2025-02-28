/* eslint-disable @next/next/no-img-element */
"use client";
import { useDashboard } from "@/context/dashboard-context";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const PrintQrCode = () => {
  const { business } = useDashboard();

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = content;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <div>
      <div ref={printRef} className="hidden print:block">
        <div className="relative p-4 h-[1024px] w-[774px] max-h-screen max-w-screen grid place-content-center">
          <div className="absolute top-0 h-full w-full grid grid-rows-[60%_1fr]">
            <div className="bg-[url(/images/bg-qr.png)] w-full h-full"></div>
            <div className="bg-white"></div>
          </div>

          <div className="relative z-50 bg-white max-w-[613px] grid gap-8 place-content-center place-items-center shadow-lg h-[916px] rounded-tl-[280px] rounded-b-md p-4 pt-[83px] w-full px-[50px]">
            <img
              className="h-[40px] w-[160px]"
              src={(business?.logo as string) || "/placeholder.jpg"}
              alt="coupon worldwide logo"
            />
            <img
              className="w-[280px] max-w-full h-[270px] mt-8"
              src={(business?.qr_code as string) || "/placeholder.jpg"}
              alt="qr code image"
            />
            <div>
              <h1 className="text-2xl text-gray-800 text-center mb-1">
                {business?.name}
              </h1>

              <p className="text-center text-[#090F47] text-xl">
                {business?.url}
              </p>
              <div className="grid place-content-center w-full place-items-center">
                <p className="text-center text-xl font-normal mt-[60px] max-w-[400px]">
                Scan the QR-Code to access exclusive deals and discounts available just for you!
                </p>
              </div>
            </div>
            <h1 className="text-center text-shadow-lg text-[#090F47] text-6xl">
              SCAN QR CODE
            </h1>
          </div>
        </div>
      </div>

      <Button onClick={handlePrint} size="lg">
        Print QR Code
      </Button>
    </div>
  );
};

export default PrintQrCode;
