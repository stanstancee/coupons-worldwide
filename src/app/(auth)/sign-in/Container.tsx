"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomInput } from "@/components/ui/custom-input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ForgotPasswordToggle from "./ForgotPasswordToggle";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signInAction } from "@/actions/auth";
import { encryptData } from "@/lib/crypto";
import Cookies from "js-cookie";

const Container = () => {
  const router = useRouter();
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const { toast } = useToast();
  const formSchema = z.object({
    login: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setLoading(true);
      const response = await signInAction(formData);

      if (response.status) {
        if (response?.data?.user === "customer") {
          toast({
            description: "Sorry, you are not allowed to sign in.",
            variant: "destructive",
          });
          setLoading(false);
        } else {
          toast({
            description: response.message,
            variant: "default",
          });
          Cookies.set("token", encryptData(response.data.token));
          Cookies.set("user", JSON.stringify(response.data.user));
          Cookies.set("isOnboarded", response?.data?.user?.is_onboarded);
          if (!response?.data?.user?.is_onboarded) {
            router.push("/profile/create");
          } else {
            router.push(redirectPath);
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="grid place-items-center h-full place-content-center pt-8 ">
      <div className="flex flex-col gap-6 xl:gap-8 md:w-[25rem] w-full ">
        <div className="grid place-items-center md:place-content-center">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center">Log In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-8">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput {...field} type="email" label="Email" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput {...field} type="password" label="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ForgotPasswordToggle
              staySignedIn={staySignedIn}
              setStaySignedIn={setStaySignedIn}
            />
            <Button
              isLoading={loading}
              className="font-bold"
              type="submit"
              size={"lg"}
            >
              Submit
            </Button>

            <div className="text-center mt-[25%]">
              <p className="text-sm text-[#4A4A4A] mb-4">
                Don&lsquo;t have an account?
              </p>
              <a
                href="/sign-up"
                className="text-primary text-[.94rem] font-bold  hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
