/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormControl, FormLabel, FormItem, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"

const SelectDate = ({
  form,
  title,
  name,
}: {
  form: any
  title: string
  name: string
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-[#1D1B23] font-semibold" htmlFor={name} aria-required>
            {title}
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button" // Change to type="button" to prevent form submission
                  variant={"outline"}
                  className={cn(
                    "py-5 text-left font-normal w-full shadow-grid-item rounded-[12px] px-6 justify-between pr-0 h-[50px] ",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                  <span className="flex items-center w-[50px] h-[50px] justify-center bg-primary rounded-[12px] text-white">
                    <CalendarIcon className="h-4 w-4 " />
                  </span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date?.toISOString())
                }}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { SelectDate }

