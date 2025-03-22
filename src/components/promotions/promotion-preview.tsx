/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PromotionFormData } from "@/lib/schema";
import Image from "next/image";

interface PreviewProps {
  data: Partial<PromotionFormData>;
  duration: number;
  promotionChannel: any
}

export function PromotionPreview({ data, duration  , promotionChannel}: PreviewProps) {
 

  const getImage = () => {
    return promotionChannel.image;
  };

  return (
    <div className="rounded-lg border bg-background p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
          
            {data.promotionType === "Store" ? "Store" : "Campaign"}
          </h3>
          <span className="text-sm text-muted-foreground">Preview</span>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="relative w-full h-[400px] 2xl:h-[500px] bg-gray-100">
            <Image
              src={getImage() || "/placeholder.jpg"}
              alt={`${data.promotionType} preview`}
              fill
              className="object-contain"
            />
      
            
          </div>
        </div>

        <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">
              {data.promotionType || "Not selected"}
            </span>
          </div>
          {data.promotionType === "Campaign" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaign:</span>
              <span className="font-medium">
                Campaign #{data.campaignId || "Not selected"}
              </span>
            </div>
          )}
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Channel:</span>
            <span className="font-medium">
              {data.adChannel || "Not selected"}
            </span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{duration || 0} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
