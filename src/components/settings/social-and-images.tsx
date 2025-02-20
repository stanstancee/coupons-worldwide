"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
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

import { SocialSchem, type SocialFormValues } from "@/lib/schema";
import { Separator } from "@/components/ui/separator";
import TitleAndDescription from "../ui/title-and-description";
import TechStackManager from "./tech-stack-manager";
import { useDashboard } from "@/context/dashboard-context";
import { updateSocialAction } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";

export default function SocialForm() {
  const { toast } = useToast();
  const { business } = useDashboard();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<SocialFormValues>({
    resolver: zodResolver(SocialSchem),
    defaultValues: {
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
    },
  });

  useEffect(() => {
    if (business) {
      form.reset({
        instagram: business.instagram,
        twitter: business.twitter,
        facebook: business.facebook,
        linkedin: business.linkedin,
        youtube: business.youtube || "",
      });
    }
  }, [business, form]);

  async function onSubmit(data: SocialFormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("business_uid", business?.uid || "");

    try {
      setIsLoading(true);
      const res = await updateSocialAction(formData);
      if (res.status) {
        toast({
          title: "Success",
          description: res?.message,
        });

        await mutate("/profile/info");
      } else {
        toast({
          title: "Error",
          description: res?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[1200px]"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row xl:gap-11 2xl:gap-28">
              <div className="md:max-w-[350px]">
                <TitleAndDescription
                  title="Social Information"
                  description="Add your social media pages"
                />
              </div>

              <div className="flex flex-col gap-4 w-full lg:max-w-[600px]">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-none h-[48px] text-[#515B6F]"
                          placeholder="https://www.instagram.com/nomad/"
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
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        Twitter
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-none h-[48px] text-[#515B6F]"
                          placeholder="https://twitter.com/nomad/"
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
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-none h-[48px] text-[#515B6F]"
                          placeholder="https://web.facebook.com/nomad/"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-none h-[48px] text-[#515B6F]"
                          placeholder="Enter your LinkedIn address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#515B6F] font-semibold text-base">
                        Youtube
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-none h-[48px] text-[#515B6F]"
                          placeholder="Enter your youtube address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator />

          <div className="flex justify-end">
            <Button isLoading={isLoading} type="submit" className="h-[48px]">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>

      <div className="space-y-8 max-w-[1200px] py-10">
        <Separator />
        <TechStackManager />
      </div>
    </div>
  );
}
