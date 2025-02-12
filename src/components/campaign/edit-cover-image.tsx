/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useDashboard } from "@/context/dashboard-context";
import { useToast } from "@/hooks/use-toast";
import { editImagesAction } from "@/actions/campaign";
import { useForm } from "react-hook-form";

export default function CoverImageUpdate() {
  const { campaignDetails } = useDashboard();

  const { setImage, image, getRootProps, getInputProps, isDragActive } =
    useImageUpload();

  useEffect(() => {
    if (campaignDetails?.campaign?.cover_image) {
      setImage(campaignDetails.campaign.cover_image as string);
    }
  }, [campaignDetails, setImage]);
  const { handleSubmit } = useForm();


  

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();
  const handleEdit = async () => {
    const formData = new FormData();

    if (image instanceof File) {
      formData.append("cover_image", image);
      formData.append("uid", campaignDetails?.campaign?.uid as string);

      try {
        setIsUploading(true);
        const response = await editImagesAction(formData);
        if (response?.status) {
          toast({
            title: "Success",
            description: response?.message,
          });
        } else {
          toast({
            title: "Error",
            description: response?.message,
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          description: error?.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(() => {})}
      className="w-full max-w-4xl mx-auto p-4 shadow-grid-item bg-white lg:p-7 rounded-[12px] cursor-pointer"
    >
      <h3 className="mb-10  font-bold">Cover Image</h3>
      <div className="relative group">
        <div
          {...getRootProps()}
          className={`relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-lg ${
            isDragActive ? "border-2 border-dashed border-primary" : ""
          }`}
        >
          <input {...getInputProps()} />
          <Image
            src={
              typeof image === "string"
                ? image
                : //object url
                image
                ? URL.createObjectURL(image as File)
                : "/placeholder.jpg"
            }
            width={400}
            height={400}
            alt="Cover"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Camera className="text-white w-12 h-12" />
          </div>
        </div>
        {isDragActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">
              Drop the image here
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleEdit}
          isLoading={isUploading}
          disabled={isUploading}
          type="button"
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>
      </div>
    </form>
  );
}
