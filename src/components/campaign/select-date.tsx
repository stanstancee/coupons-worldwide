/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

const SelectDate = ({ form }: { form: any }) => {
  return (
    <FormField
      control={form.control}
      name="valid-until"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            className="text-[#1D1B23] font-semibold"
            htmlFor="valid-until"
            aria-required
          >
            Valid Until<span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "py-5 text-left font-normal w-full shadow-grid-item rounded-[12px] px-6 justify-between pr-0 h-[50px] ",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <span className="flex items-center w-[50px] h-[50px] justify-center bg-primary rounded-[12px] text-white">
                    <CalendarIcon className="h-4 w-4 " />
                  </span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SelectDate };
