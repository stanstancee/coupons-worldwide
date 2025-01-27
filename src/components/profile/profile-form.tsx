"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries } from "@/lib/countries";
import { profileFormSchema, type ProfileFormValues } from "@/lib/schema";

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "Alexa",
      lastName: "Rawles",
      email: "alexarawles@gmail.com",
      gender: "female",
      country: "US",
      currentPassword: "",
      newPassword: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    setIsEditing(false);
    console.log("Form submitted:", data);
    // Here you would typically save the changes to your backend
  }

  const getCountryFlag = (code: string) => {
    return `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
  };

  return (
    <div className="p-4 md:px-5 md:my-8 md:min-h-[760px] ">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-8 md:items-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={`/avatar.png`}
            alt="Profile picture"
            className="object-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-medium">
            {form.watch("firstName")} {form.watch("lastName")}
          </h2>
          <p className="text-muted-foreground">{form.watch("email")}</p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-[1304px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className="h-[48px] bg-[#F9F9F9] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className="h-[48px] bg-[#F9F9F9] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[48px] bg-[#F9F9F9] ">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[48px] bg-[#F9F9F9] ">
                        <SelectValue placeholder="Select country">
                          {field.value && (
                            <div className="flex items-center gap-2">
                              <Image
                                src={
                                  getCountryFlag(field.value) ||
                                  "/placeholder.svg"
                                }
                                alt=""
                                width={24}
                                height={18}
                                className="rounded-sm"
                              />
                              {
                                countries.find((c) => c.code === field.value)
                                  ?.name
                              }
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                getCountryFlag(country.code) ||
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
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] bg-[#F9F9F9] "
                      type="password"
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px] bg-[#F9F9F9] "
                      type="password"
                      {...field}
                      disabled={!isEditing}
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              className="min-w-[94px] min-h-[45px]"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button className="min-w-[94px] min-h-[45px]" type="submit">
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
