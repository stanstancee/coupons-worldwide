"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileInput } from "@/components/ui/custom-input";
import { handleDateChange } from "@/utils/handleDateChange";

interface CompanyDetailsProps {
  onNext: () => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ onNext }) => {
  const formSchema = z.object({
    name: z.string().min(3),
    size: z.string().min(1, { message: "Company size is required" }),
    address: z.string().min(3, { message: "Company address is required" }),
    phone: z.string().min(3, { message: "Company phone is required" }),
    country: z.string().min(2, { message: "Company country is required" }),
    state: z.string().min(2, { message: "Company state is required" }),
    city: z.string().min(2, { message: "Company city is required" }),
    //check for valid date format
    date: z.string().refine(
      (val) => {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const dateParts = val.split("/");
        if (dateRegex.test(val) && dateParts.length === 3) {
          const month = parseInt(dateParts[0], 10);
          const day = parseInt(dateParts[1], 10);
          const year = parseInt(dateParts[2], 10);
          const d = new Date(year, month - 1, day);
          return (
            d.getMonth() + 1 === month &&
            d.getFullYear() === year &&
            d.getDate() === day &&
            !isNaN(d.getTime())
          );
        }
        return false;
      },
      { message: "Date must be in MM/DD/YYYY format and valid" }
    ),
    //
    email: z.string().email(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      size: "",
      address: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext();
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileInput label="Your Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileInput
                    label="Company Size"
                    {...field}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(e);
                    }}
                    rightIcon={"/svg/employee.svg"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-blue1 font-bold text-sm">Company Location</h1>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileInput label="Company Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid xl:grid-cols-3 gap-4 ">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput label="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput label="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput label="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-4">
              <h1 className="text-blue1 font-bold text-sm">Year Founded</h1>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ProfileInput
                        leftIcon="/svg/date.svg"
                        label="Enter Date"
                        placeholder="MM/DD/YYYY"
                        type="text"
                        maxLength={10} // Limit input to 10 characters
                        value={field.value || ""}
                        onChange={(e) => {
                          handleDateChange(e);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-blue1 font-bold text-sm">Telephone Number</h1>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProfileInput type="email" label="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="flex justify-between gap-5 w-full mt-4">
            <Button
              size={"lg"}
              variant={"outline"}
              className="flex-1 text-primary border-primary font-bold text-base"
              onClick={() => router.back()}
            >
              Return to onboarding
            </Button>
            <Button
              type="submit"
              size={"lg"}
              className="flex-1 font-bold text-base"
            >
              Next
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default CompanyDetails;
