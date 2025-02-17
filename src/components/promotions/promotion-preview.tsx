import type { PromotionFormData } from "@/lib/schema";
import Image from "next/image";

interface PreviewProps {
  data: Partial<PromotionFormData>;
  duration: number;
}

export function PromotionPreview({ data, duration }: PreviewProps) {
  const getAdLabel = () => {
    switch (data.adChannel) {
      case "Featured":
        return "Featured";
      case "Promoted":
        return "Promoted";
      case "Popular":
        return "Popular";
      default:
        return "Advertisement";
    }
  };

  const getImage = () => {
    if (data.promotionType === "Store") {
      return "/store.jpg";
    } else {
      return "/product.jpg";
    }
  };

  return (
    <div className="rounded-lg border bg-background p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {getAdLabel()}{" "}
            {data.promotionType === "Store" ? "Store" : "Campaign"}
          </h3>
          <span className="text-sm text-muted-foreground">Preview</span>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="relative aspect-video">
            <Image
              src={getImage() || "/placeholder.svg"}
              alt={`${data.promotionType} preview`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-2 inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                {getAdLabel()}
              </div>
              <h4 className="text-2xl font-bold text-white">
                {data.promotionType === "Store"
                  ? "Featured Store"
                  : "Special Campaign"}
              </h4>
              {duration && (
                <p className="mt-2 text-sm text-white/80">
                  Running for {duration}{" "}
                  {Number.parseInt(duration?.toString()) === 1 ? "day" : "days"}
                </p>
              )}
            </div>
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
          <div className="flex justify-between">
            <span className="text-muted-foreground">Channel:</span>
            <span className="font-medium">
              {data.adChannel || "Not selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{duration || 0} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
