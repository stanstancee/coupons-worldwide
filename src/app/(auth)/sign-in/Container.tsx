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
import { useRouter } from "next/navigation";

const Container = () => {
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false);
  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must not be greater than 20 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/");
  }
  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-8 w-[25rem]">
        <div className="grid place-items-center place-content-center">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center">Log In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-6">
            <FormField
             
              control={form.control}
              name="email"
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
            <Button className="font-bold" type="submit" size={"lg"}>
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
