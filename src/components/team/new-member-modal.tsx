"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useDashboard } from "@/context/dashboard-context";
import { useToast } from "@/hooks/use-toast";
import { createTeamAction } from "@/actions/team";

interface NewMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewMemberModal({ open, onOpenChange }: NewMemberModalProps) {
  const { profile } = useDashboard();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    first_name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    business_uid: z.string().optional(),
    email: z.string().email(),
    profile_image: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      profile_image: null,
      business_uid: profile?.businesses[0]?.uid,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    setAvatarPreview(URL.createObjectURL(file));
    form.setValue("profile_image", file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { first_name, last_name, email, profile_image } = data;
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("profile_image", profile_image);
    formData.append("business_uid", profile?.businesses[0]?.uid as string);
    try {
      setIsLoading(true);
      const response = await createTeamAction(formData);
      if (response?.status) {
        toast({
          title: "Success",
          description: response?.message,
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: response?.message,
          variant: "destructive",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[551px] rounded-none shadow-none border-0">
        <DialogHeader>
          <DialogTitle className="text-[#25324B]">New Team Member</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="space-y-[2px]">
            <h1 className="text-sm font-semibold text-[#25324B]">
              Basic Information
            </h1>
            <p className="text-xs text-[#7C8493]">
              This is basic information of the team.
            </p>
          </div>
          <div
            {...getRootProps()}
            className="cursor-pointer flex gap-4 lg:gap-8 2xl:gap-14 items-center"
          >
            <input {...getInputProps()} />

            <img
              src={avatarPreview || "/subscription_bg.png"}
              alt="Avatar preview"
              className="h-20 w-20 rounded-full object-cover"
            />

            <div
              className={cn(
                "flex flex-col gap-2 w-[303px] place-content-center place-items-center border border-dashed border-[#202871] p-4 rounded-md bg-[#F8F8FD]",
                isDragActive && "border-c-green"
              )}
            >
              <Images className="text-[#25324B]" />
              <p className="text-xs text-[#7C8493]">
                <strong className="text-[#25324B]">Click to replace</strong> or
                drag and drop SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </div>
          </div>

          <Separator />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 md:gap-6 p-4"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#515B6F] font-semibold">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="h-[44px] rounded-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#515B6F] font-semibold">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="h-[44px] rounded-none"
                    />
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
                  <FormLabel className="text-[#515B6F] font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jD6oM@example.com"
                      {...field}
                      className="h-[44px] rounded-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="" />
            <div className="flex justify-end w-full">
              <Button type="submit" className=" h-[36px]" isLoading={isLoading}>
                Send Invite
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
