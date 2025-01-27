"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogoUpload } from "./logo-upload";
import { RichTextEditor } from "./rich-text-editor";
import { companyFormSchema, type CompanyFormValues } from "@/lib/schema";
import { Separator } from "../ui/separator";
import TitleAndDescription from "../ui/title-and-description";

const employeeRanges = [
  "1 - 50",
  "51 - 200",
  "201 - 500",
  "501 - 1000",
  "1000+",
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Other",
];

export default function CompanyProfileForm() {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      website: "",
      email: "",
      employeeCount: "",
      industry: "",
      phone: "",
      description: "",
    },
  });

  async function onSubmit(data: CompanyFormValues) {
    console.log(data);
    // Handle form submission
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[1200px]">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <Separator />

            <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
              <div className="md:max-w-[350px]">
                <TitleAndDescription
                  title="Company Logo"
                  description="This image will be shown publicly as company logo."
                />
              </div>

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LogoUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
                <div className="md:max-w-[350px]">
                  <TitleAndDescription
                    title="Company Details"
                    description="Introduce your company core info quickly to users by fill up company details"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full lg:max-w-[600px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full rounded-none h-[48px] text-[#515B6F]" placeholder="Enter company name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="url"  className="w-full text-[#515B6F]  rounded-none h-[48px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Official Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email"  className="w-full rounded-none h-[48px] text-[#515B6F]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="employeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#515B6F] font-semibold text-base">
                            Employee
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger  className="rounded-none h-[48px] text-[#515B6F]">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employeeRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
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
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#515B6F] font-semibold text-base">
                            Industry
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger  className="rounded-none h-[48px] text-[#515B6F]">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#515B6F] font-semibold text-base">
                          Official Phone number
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="tel"  className="w-full  rounded-none h-[48px] text-[#515B6F]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row  xl:gap-11  2xl:gap-28">
                <div className="md:max-w-[350px]">
                  <TitleAndDescription
                    title="About Company"
                    description="Brief description for your company. URLs are hyperlinked."
                  />
                </div>

            <div className='w-full '>
            <FormField
              control={form.control}
              name="description"

              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#515B6F] font-semibold text-base">
                    Description
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground text-right">
                    Maximum 500 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          </div>
          </div>
          <Separator />

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
