/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import NextImage from "next/image";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "../ui/button";
import { deleteImageAction, editImagesAction } from "@/actions/campaign";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import CoverImageUpdate from "./edit-cover-image";
import { useToast } from "@/hooks/use-toast";

type Asset = {
  id: number;
  uid: string;
  campaign_id: number;
  asset_path: string;
  created_at: string;
  updated_at: string;
};

const EditImages = ({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: any;
  setUploadedFiles: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { campaignDetails } = useDashboard();
  const images: Asset[] = useMemo(
    () => campaignDetails?.campaign?.assets || [],
    [campaignDetails]
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    setUploadedFiles(images);
  }, [images, setUploadedFiles]);

  // const convertToFile = async (
  //   url: string,
  //   fileName: string,
  //   format: "image/jpeg" | "image/png" = "image/jpeg",

  // ): Promise<File> => {
  //   // Fetch the image as a blob
  //   const response = await fetch(
  //     `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  //   );
  //   const blob = await response.blob();

  //   // Create an HTML image element
  //   const img = await new Promise<HTMLImageElement>((resolve, reject) => {
  //     const image = new Image();
  //     image.crossOrigin = "anonymous"; // Handle CORS
  //     image.onload = () => resolve(image);
  //     image.onerror = (err) => {
  //       console.error("Image load error:", err);
  //       reject(new Error(`Failed to load image from URL: ${url}`));
  //     };
  //     image.src = URL.createObjectURL(blob);
  //   });

  //   // Draw the image on a canvas to re-encode it
  //   const canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) throw new Error("Canvas context is not available");

  //   ctx.drawImage(img, 0, 0);

  //   // Convert the canvas content to the desired image format
  //   const newBlob = await new Promise<Blob | null>((resolve) =>
  //     canvas.toBlob(resolve, format)
  //   );
  //   if (!newBlob) throw new Error("Failed to create new image blob");

  //   // Create and return a File object

  //   return new File([newBlob], fileName, { type: format });
  // };

  const { handleSubmit } = useForm();

  const handleEdit = async () => {
    const formData = new FormData();

    for (let i = 0; i < uploadedFiles?.length; i++) {
      const file = uploadedFiles[i];
      if (file instanceof File) {
        formData.append(`media[]`, file);
      } else if ("uid" in file) {
        continue;
      }
    }
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
        title: "Error",
        description:
          error?.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };



  const handleDelete = async (fileIndex: number, file: File | Asset) => {
    if ("uid" in file) {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== fileIndex)
      );
      await deleteImageAction({
        campaign_uid: campaignDetails?.campaign?.uid as string,
        asset_uid: file.uid,
      });
    } else {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== fileIndex)
      );
    }
  };

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
  });

  return (
    <div className="flex flex-col gap-4">
      <CoverImageUpdate />
      <Separator />
      <form
        className="shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px]"
        onSubmit={handleSubmit(() => {})}
      >
        <h1 className="text-sm font-bold text-[#1D1B23] mb-4">Edit Images</h1>
        <div
          {...getRootProps()}
          className={`border-dashed border-2  border-[#717579] rounded-md p-4 md:p-6 h-[300px] flex flex-center justify-center ${
            isDragActive ? "border-c-blue bg-blue-50" : "border-[#717579]"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col justify-center items-center p-4 bg-[#EEEEEE] w-full h-full cursor-pointer">
            <NextImage
              src="/svg/image-icon.svg"
              alt="Upload"
              width={74}
              height={74}
            />
            <p className="mt-[47px] text-[#717579]">
              {isDragActive ? (
                "Drop the files here..."
              ) : (
                <div className="text-xs text-center ">
                  <span className="text-c-orange font-semibold pr-1 ">
                    Upload a file
                  </span>
                  or drag and drop PNG, JPG, GIF up to 10MB
                </div>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {uploadedFiles?.map((file, index) => (
            <div
              key={index}
              className="relative border border-gray-300 p-2 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <NextImage
                src={file.uid ? file.asset_path : URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
                width={80}
                height={80}
              />
              <button
                onClick={() => handleDelete(index, file)}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <Button
          size={"lg"}
          type="button"
          className="bg-primary text-white my-6 mt-4 min-w-[100px]"
          onClick={handleEdit}
          isLoading={isUploading}
          disabled={isUploading}
        >
          Save Changes
        </Button>
        {/*  */}
      </form>
    </div>
  );
};

export default EditImages;
