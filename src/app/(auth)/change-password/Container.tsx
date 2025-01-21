"use client";

import React from "react";
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


const Container = () => {

  const formSchema = z
    .object({

      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, {
          message: "Password must not be greater than 20 characters",
        }),


      confirm_password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, {
          message: "Password must not be greater than 20 characters",
        }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password and Confirm Password must be the same",
          path: ["confirm_password"],
        });
      }
    });

  type RegisterSchema = z.infer<typeof formSchema>;

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      password: "",
      confirm_password: "",

    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="grid place-items-center h-full place-content-center pt-8">
      <div className="flex flex-col gap-6 xl:gap-12 w-[25rem]">
        <div className="grid place-items-center place-content-center ml-8">
          <Image
            height={36}
            width={228}
            src={"/coupons-worldwide.svg"}
            alt="coupons-worldwide logo"
          />
        </div>
        <h1 className="font-semibold text-[#4A4A4A] text-center">Set a New Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-6 md:gap-8">


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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      {...field}
                      type="password"
                      label="Confirm Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button className="font-bold" type="submit" size={"lg"}>
            Set New Password
            </Button>


          </form>
        </Form>
      </div>
    </div>
  );
};

export default Container;
