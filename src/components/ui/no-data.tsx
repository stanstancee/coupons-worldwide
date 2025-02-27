import { FileQuestion } from "lucide-react";

interface NoDataProps {
  title: string;
  description?: string;
}

export function NoData({ title, description }: NoDataProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="rounded-full bg-muted/60 p-4 ring-1 ring-border/5 backdrop-blur-sm transition-transform hover:scale-105 md:p-6">
        <FileQuestion
          className="h-8 w-8 text-muted-foreground md:h-12 md:w-12"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-medium tracking-tight md:text-xl">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
