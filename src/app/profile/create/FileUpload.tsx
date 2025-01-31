/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadFilesAction } from "@/actions/onboarding";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";


const FileUpload = ({ setActiveTab }: { setActiveTab: any }) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [workplaceImages, setWorkplaceImages] = useState<File[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle logo upload
  const handleLogoDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLogo(acceptedFiles[0]);
    }
  };

  // Handle workplace images upload
  const handleImagesDrop = (acceptedFiles: File[]) => {
    if (workplaceImages.length + acceptedFiles.length <= 5) {
      setWorkplaceImages([...workplaceImages, ...acceptedFiles]);
    } else {
      alert("You can upload a maximum of 5 images.");
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) {
      return `${mb.toFixed(2)}MB`;
    }
    const kb = bytes / 1024;
    return `${Math.round(kb)}KB`;
  };

  // Remove logo
  const removeLogo = () => {
    setLogo(null);
  };

  // Remove a specific workplace image
  const removeImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const updatedImages = [...workplaceImages];
    updatedImages.splice(index, 1);
    setWorkplaceImages(updatedImages);
  };

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    onDrop: handleLogoDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
    isDragActive,
  } = useDropzone({
    onDrop: handleImagesDrop,
    accept: { "image/*": [] },
  });

  const onSubmit = async () => {
    const formData = new FormData();
    const business_uid = Cookies.get("business_uid");

    formData.append("business_uid", business_uid as string);
    formData.append("logo", logo as File);

    workplaceImages.forEach((image, index) => {
      formData.append(`media[${index}]`, image as File);
    });

    try {
      setLoading(true);
      const res = await uploadFilesAction(formData);
      if (res.status) {
        toast({
          description: res.message,
          title: "Success",
        });
        router.push("/");
      } else {
        toast({
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 lg:justify-between">
        {/* drag and drop section */}
        <div
          {...getLogoRootProps()}
          className="w-full lg:w-3/5 flex flex-col gap-6 h-[173px] bg-[#F8F8F8] rounded-[1.5rem] p-4 lg:p-8"
        >
          <input {...getLogoInputProps()} />
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center p-4 lg:p-8 border-[2px] border-dashed border-[#E2E6EA] rounded-[24px]",
              isLogoDragActive && "border-primary"
            )}
          >
            <h2 className="text-center text-[#242634]/50 text-sm">
              Click to browse or drag and drop your logo here
            </h2>
          </div>
        </div>

        {/* logo section */}
        <div className="cursor-pointer w-full lg:w-2/5 flex flex-col gap-6 h-[173px] bg-white rounded-[1.5rem] p-4 lg:p-8 border border-[#E8E8E8] relative">
          {logo ? (
            <div className="flex flex-col items-center   ">
              <img
                src={URL.createObjectURL(logo)}
                alt="Uploaded Logo"
                className="w-full lg:h-3/4 h-[173px] "
              />
              <Button
                className="absolute top-0 right-0 w-12 h-12  bg-[#D9D9D980] hover:bg-[#D9D9D9]/90 rounded-full p-2"
                onClick={removeLogo}
              >
                <Image
                  alt="trash"
                  src="/svg/trash.svg"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center p-4 lg:p-8 rounded-[24px]">
              <h2 className="text-center text-[#242634]/50 text-sm">
                Upload your logo
              </h2>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <section
          onClick={(e) => e.stopPropagation()}
          {...getImagesRootProps()}
          className={cn(
            "shadow-lg bg-white rounded-[1.5rem] p-4",
            isDragActive && "border-2 border-dashed border-primary"
          )}
        >
          <input {...getImagesInputProps()} />
          <Button className="rounded-[40px] text-sm font-semibold bg-[#F7F9FB] shadow-sm text-black hover:bg-[#F7F9FB]/90 px-6 mb-4">
            Upload Workplace Images
          </Button>

          <div className="flex flex-col ">
            {workplaceImages.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-4  py-4 justify-between border-b border-b-[#E8E8E8] last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Workplace Image ${index + 1}`}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <p className="text-sm font-semibold text-heading truncate max-w-[30ch] ">
                    {image.name}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="text-heading text-xs border border-[#CDD3D8] p-1">
                    {formatFileSize(image.size)}
                  </div>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={(e) => removeImage(e, index)}
                  >
                    <Image
                      src="/svg/trash.svg"
                      width={13}
                      height={13}
                      alt="trash"
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-4  mt-4">
          <CircleCheck className="h-4 w-4" />
          <p className="text-xs">Upload a maximum of 5 images</p>
        </div>
      </div>

      <section className="flex flex-col md:flex-row justify-between gap-5 w-full mt-4">
        <Button
          size={"lg"}
          variant={"outline"}
          className="flex-1 text-primary border-primary font-bold text-base  "
          onClick={() => setActiveTab("about")}
        >
          Return to Company Details
        </Button>
        <Button
          size={"lg"}
          className={cn("flex-1 font-bold text-base")}
          disabled={!logo || workplaceImages.length < 5}
          isLoading={loading}
          onClick={onSubmit}
        >
          Complete Setup
        </Button>
      </section>
    </div>
  );
};

export default FileUpload;
