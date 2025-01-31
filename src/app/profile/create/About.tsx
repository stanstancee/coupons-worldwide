/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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
import { CustomTextarea } from "@/components/ui/custom-textarea";
import Cookies from "js-cookie";
import { onboardBusinessAction } from "@/actions/onboarding";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  about: z.string().min(20),
  primary_category: z.string().min(3),
  secondary_category: z.string().min(3),
  linkedin: z.string().min(0),
  twitter: z.string().min(0),
  instagram: z.string().min(0),
  facebook: z.string().min(0),
});

type FormData = z.infer<typeof formSchema>;

const About = ({ setActiveTab }: { setActiveTab: any }) => {
  const { toast } = useToast();
  let companyDetails = Cookies.get("companyDetailsFormData") || "{}";
  if (companyDetails) {
    companyDetails = JSON.parse(companyDetails);
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: "",
      primary_category: "",
      secondary_category: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
    },
  });

  useEffect(() => {
    const cookieData = Cookies.get("aboutFormData");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof FormData, parsedData[key]);
      });
    }
  }, [form]);

  const onSubmit = async (data: FormData) => {
    const values = JSON.stringify(data);
    Cookies.set("aboutFormData", values, { expires: 7 });
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Object.entries(companyDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setIsLoading(true);
      const response = await onboardBusinessAction(formData);
      if (response.status) {
        console.log(response?.data)
        setActiveTab("logo");
        Cookies.set('business_uid' , response?.data?.business_uid)
       
      }
      else{
        toast({
          variant: "destructive",
          title: "Error",
          description: response?.message
        })
      }

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomTextarea
                  className="h-[268px]"
                  label="About Company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h1 className="text-blue1 font-bold text-sm mb-[10px]">
            Social Media Accounts
          </h1>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="primary_category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput label="Primary Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondary_category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput label="Sub Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <h1 className="text-blue1 font-bold text-sm mb-[10px]">
            Social Media Accounts
          </h1>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput
                      leftIcon="/svg/linkedin.svg"
                      label="Linkedin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput
                      leftIcon="/svg/facebook.svg"
                      label="Facebook"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput
                      leftIcon="/svg/x.svg"
                      label="X (twitter)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileInput
                      leftIcon="/svg/instagram.svg"
                      label="Instagram"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <section className="flex justify-between gap-5 w-full mt-4">
          <Button
            size={"lg"}
            variant={"outline"}
            className="flex-1 text-primary border-primary font-bold text-base"
            onClick={() => setActiveTab("details")}
          >
            Return to Company Details
          </Button>
          <Button
            isLoading={isLoading}
            type="submit"
            size={"lg"}
            className="flex-1 font-bold text-base"
          >
            Next
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default About;
