"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

interface PrintableCouponProps {
  businessName: string;
  logoImage: string;
  couponUrl: string;
  instructions?: string;
}

export default function PrintableCoupon({
  businessName ,
  logoImage,
  couponUrl ,
  instructions ,
}: PrintableCouponProps) {
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
      <div ref={printRef} className="hidden">
        <div className=" bg-white p-8">
          <Image
            src={logoImage || "/placeholder.jpg"}
            alt="Business Logo"
            width={180}
            height={70}
            className="mx-auto mb-4"
          />
          <div className="max-w-md mx-auto space-y-6 w-full flex flex-col place-items-center">
          <Image
            src="/qr_code.png"
            alt="QR Code"
            width={250}
            height={250}
            className="object-contain"
          />
            <div className="text-center">
              <h1 className="text-2xl font-bold">{businessName}</h1>
            </div>
           
            <p className="text-center text-sm">{couponUrl}</p>
            <p className="text-center text-sm">{instructions}</p>
            <div className="text-center">
              <h2 className="text-2xl font-bold">SCAN QR CODE</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Button onClick={handlePrint} size="lg">
          Print QR Code
        </Button>
      </div>
    </div>
  );
}
