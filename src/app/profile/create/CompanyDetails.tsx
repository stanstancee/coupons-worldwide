/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useEffect } from "react";
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
import { ProfileInput, GoogleAddressInput } from "@/components/ui/custom-input";
import { handleDateChange } from "@/utils/handleDateChange";
import Cookies from "js-cookie";
import { countries } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface CompanyDetailsProps {
  onNext: () => void;
}

const formSchema = z.object({
  name: z.string().min(3),
  size: z.string().min(1, { message: "Company size is required" }),
  address: z.string().min(3, { message: "Company address is required" }),
  phone: z.string().min(3, { message: "Company phone is required" }),
  country: z.string().min(2, { message: "Company country is required" }),
  state: z.string().min(2, { message: "Company state is required" }),
  city: z.string().min(2, { message: "Company city is required" }),
  date: z.string().refine(
    (val) => {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      const dateParts = val.split("/");
      if (dateRegex.test(val) && dateParts.length === 3) {
        const month = Number.parseInt(dateParts[0], 10);
        const day = Number.parseInt(dateParts[1], 10);
        const year = Number.parseInt(dateParts[2], 10);
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
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ onNext }) => {
  const router = useRouter();

  const form = useForm<FormData>({
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

  useEffect(() => {
    const cookieData = Cookies.get("companyDetailsFormData");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof FormData, parsedData[key]);
      });
    }
  }, [form]);

  const onSubmit = (values: FormData) => {
    Cookies.set("companyDetailsFormData", JSON.stringify(values), {
      expires: 7,
    }); // Expires in 7 days
    onNext();
    console.log(values);
  };

  const [country, setCountry] = React.useState("");

  useEffect(() => {
    setCountry(form.watch("country"));
  }, [form]);

  const handleAddressSelect = (address: any) => {
    const addressComponents = address?.address_components;
    if (addressComponents) {
      form.setValue("address", address?.formatted_address);
      addressComponents?.forEach((component: any) => {
        if (component?.types.includes("locality")) {
          form.setValue("city", component?.long_name);
        }
        if (component.types.includes("country")) {
          form.setValue("country", component?.long_name);
        }
        if (component?.types.includes("administrative_area_level_1")) {
          form.setValue("state", component?.long_name);
        }
      });
    }
  
  };

  const getCountryFlag = (code: string) => {
    return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
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
                  <GoogleAddressInput
                    onAddressSelect={handleAddressSelect}
                    placeholder="Enter company address"
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                    {...field}
                  />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex w-full text-[#1A4F6E] h-14 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="Select country">
                          {country || field.value && (
                            <div className="flex items-center gap-2">
                              <Image
                                src={
                                  getCountryFlag(
                                    countries.find(
                                      (c) =>
                                        (c.name === field.value) ||
                                        (c.name === country)
                                    )?.code || ""
                                  ) || "/placeholder.svg"
                                }
                                alt=""
                                width={24}
                                height={18}
                                className="rounded-sm"
                              />
                              {field.value || country}
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                getCountryFlag(country.code) ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt=""
                              width={24}
                              height={18}
                              className="rounded-sm"
                            />
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Input
                      className="flex w-full text-[#1A4F6E] h-14 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="State"
                      {...field}
                    />
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
                    <Input
                      className="flex w-full text-[#1A4F6E] h-14 font-bold border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="City"
                      {...field}
                    />
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
                        maxLength={10}
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
