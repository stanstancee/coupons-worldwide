/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type * as React from "react";
import { useEffect, useState, useMemo } from "react";
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
// import { handleDateChange } from "@/utils/handleDateChange";
import Cookies from "js-cookie";
// import { countries } from "@/lib/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";

interface CompanyDetailsProps {
  onNext: () => void;
}

const formSchema = z.object({
  name: z.string().min(3),
  company_size: z.string().min(1, { message: "Company size is required" }),
  address: z.string().or(z.undefined()).optional(),
  phone: z.string().min(3, { message: "Company phone is required" }),
  country: z.string().min(2, { message: "Company country is required" }),
  state: z.string().min(2, { message: "Company state is required" }),
  city: z.string().min(2, { message: "Company city is required" }),
  address_json: z.string().optional(),
  website: z.string().optional(),
  // date: z
  //   .string()
  //   .refine(
  //     (val) => {
  //       const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  //       const dateParts = val.split("/");
  //       if (dateRegex.test(val) && dateParts.length === 3) {
  //         const month = Number.parseInt(dateParts[0], 10);
  //         const day = Number.parseInt(dateParts[1], 10);
  //         const year = Number.parseInt(dateParts[2], 10);
  //         const d = new Date(year, month - 1, day);
  //         return (
  //           d.getMonth() + 1 === month &&
  //           d.getFullYear() === year &&
  //           d.getDate() === day &&
  //           !isNaN(d.getTime())
  //         );
  //       }
  //       return false;
  //     },
  //     { message: "Date must be in MM/DD/YYYY format and valid" }
  //   )
  //   .optional(),
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;
type Country = {
  name: string;
  currency: string;
  id: number;
  emojiU: string;
};

// interface CountryFlagProps {
//   emojiU: string;
// }

// const CountryFlag: React.FC<CountryFlagProps> = ({ emojiU }) => {
//   const emoji = emojiU
//     ?.split(" ")
//     ?.map((code) => String.fromCodePoint(parseInt(code.replace("U+", ""), 16)));

//   return <span>{emoji?.join("")}</span>;
// };

const employeeSizeRange = [
  "1-9",
  "10-19",
  "20-49",
  "50-99",
  "100-249",
  "250-499",
  "500-999",
  "1000+",
];

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ onNext }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company_size: "",
      phone: "",
      country: "",
      state: "",
      city: "",

      website: "",
      address_json: "",
    },
  });
  const { data } = useApi("/business/list-countries", {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const countryList = useMemo(() => {
    return data?.data?.map((country: Country) => ({
      value: country.name,
      name: country.name,
      code: country.currency,
      id: country.id,
      emojiU: country.emojiU,
    }));
  }, [data]);
  const [country_id, setCountryId] = useState<number | null>();
  const country = form.watch("country");
  useEffect(() => {
    if (country) {
      const countryObj = countryList?.find((c) => c.value === country);
      setCountryId(countryObj?.id);
    }
  }, [country, countryList]);

  const router = useRouter();
  const [address, setAddress] = useState<string>("");

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
    console.log(values);
    const data = {
      ...values,
      address,
      country_id,
    };
    Cookies.set("companyDetailsFormData", JSON.stringify(data), {
      expires: 7,
    }); // Expires in 7 days
    onNext();
  };

  const handleAddressSelect = (address: any) => {
    const addressComponents = address?.address_components;

    const data = {
      address: address?.address,
      lat: address?.lat,
      lng: address?.lng,
      url: address?.url,
      place_id: address?.place_id,
    };

    form.setValue("address_json", JSON.stringify(data));

    if (addressComponents) {
      addressComponents?.forEach((component: any) => {
        if (component?.types.includes("locality")) {
          form.setValue("city", component?.long_name);
        }
        if (component.types.includes("country")) {
          const countryName = component?.long_name;

          form.setValue("country", countryName);
          // Update the select component's value
          const selectElement = document.querySelector(
            'select[name="country"]'
          ) as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = countryName;
          }
        }
        if (component?.types.includes("administrative_area_level_1")) {
          form.setValue("state", component?.long_name);
        }
      });
    }
  };

  // const getCountryFlag = (code: string) => {

  //   return `https://flagcdn.com/24x18/${joinedCode?.toLowerCase()}.png`;
  // };

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
            name="company_size"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="flex w-full text-[#1A4F6E] h-14 font-medium border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                      <SelectValue placeholder="Select company size">
                        {field.value && (
                          <div className="flex items-center gap-2">
                           
                            <span></span>
                            {field.value}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeSizeRange?.map((size, index) => (
                      <SelectItem key={index} value={size}>
                        <div className="flex items-center gap-2">

                          {size}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-blue1 font-semibold text-sm">Company Location</h1>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <GoogleAddressInput
                    inputValue={address}
                    setInputValue={setAddress}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex w-full text-[#1A4F6E] h-14 font-medium border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="Select country">
                          {field.value && (
                            <div className="flex items-center gap-2">
                              {/* <Image
                                src={
                                  getCountryFlag(
                                   countryList?.find(
                                      (c) => c.name === field.value
                                    )?.currency || ""
                                  ) || "/placeholder.svg"
                                }
                                alt=""
                                width={24}
                                height={18}
                                className="rounded-sm"
                              /> */}
                              <span></span>
                              {field.value}
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryList?.map((country, index) => (
                        <SelectItem key={index} value={country.name}>
                          <div className="flex items-center gap-2">
                            {/* <Image
                              src={
                                country.emojiU ||
                                "/placeholder.svg"
                              }
                              alt=""
                              width={24}
                              height={18}
                              className="rounded-sm"
                            /> */}
                            {/* <CountryFlag emojiU={country.emojiU} /> */}
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
                      className="flex w-full text-[#1A4F6E] h-14 font-medium border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="flex w-full text-[#1A4F6E] h-14 font-medium border border-[#E8E8E8] bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus:border-primary focus-visible:ring-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid  lg:grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-4">
              <h1 className="text-blue1 font-semibold text-sm">
                Official Website
              </h1>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ProfileInput
                        leftIcon="/svg/website.svg"
                        label=""
                        placeholder="https://example.com"
                        type="text"
                        value={field.value || ""}
                        onChange={(e) => {
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
              <h1 className="text-blue1 font-semibold text-sm">
                Telephone Number
              </h1>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput  placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-blue1 font-semibold text-sm">
              Company Email Address
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput
                      label="Email Address"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <section className="flex justify-between gap-5 w-full mt-4 flex-wrap md:flex-nowrap">
            <Button
              size={"lg"}
              variant={"outline"}
              className="flex-1 text-primary border-primary font-bold text-base h-[48px]"
              onClick={() => router.back()}
            >
              Return to onboarding
            </Button>
            <Button
              type="submit"
              size={"lg"}
              className="flex-1 font-bold text-base h-[48px]"
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
