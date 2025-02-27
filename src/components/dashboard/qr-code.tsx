"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrintableCoupon from "./print-qrcode";
import { useDashboard } from "@/context/dashboard-context";

export default function QRCard() {
  const { profile } = useDashboard();

  const business = profile?.businesses[0];

  const { toast } = useToast();
  const url = business?.url;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || "");
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  

  return (
    <Card className="bg-white shadow-cards rounded-[10px] border-none">
      <div className="flex flex-col  gap-4 p-6">
        <h3 className="font-bold text-xl">QR Code</h3>
        <div className="relative">
          <Image
            src="/qr_code.png"
            alt="QR Code"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-4 w-full">
          <Link
            href={url || ""}
            className="text-sm text-muted-foreground hover:underline break-all flex-1 text-center"
          >
            {url}
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
            aria-label="Copy link to clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <PrintableCoupon
          businessName={business?.name as string}
          logoImage={business?.logo as string}
          couponUrl={business?.url as string}
          instructions="Scan the QR-Code to access exclusive deals and discounts available just for you!"
        />
      </div>
    </Card>
  );
}
