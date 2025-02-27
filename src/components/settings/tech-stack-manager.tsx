/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import TitleAndDescription from "../ui/title-and-description";
import { updateMediaAction, removeMediaAction } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";

import { useDashboard } from "@/context/dashboard-context";
import type { Asset } from "@/types/profile";
import { cn } from "@/lib/utils";
import { mutate } from "swr";

export default function TechStackManager() {
  const { business } = useDashboard();
  const [isEditMode, setIsEditMode] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [images, setImages] = useState<Array<File | Asset>>([]);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (business?.assets) {
      const filteredImages = images?.filter((image) => image instanceof File);
      setImages(() => [...filteredImages, ...business?.assets]);
    }
  }, [business?.assets]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImages((prevImages) => [...prevImages, file]);
  };

  const handleDeleteImage = async (index: number, image: File | Asset) => {
    if (image instanceof File) {
      setImages(images.filter((image, i) => i !== index));
      return;
    } else {
      try {
        setIsDeleting(true);
        await removeMediaAction({
          business_uid: business?.uid || "",
          asset_uid: image.uid,
        });
        //remove all except instanceof File  after deleting one
        const filteredImages = images?.filter((image) => image instanceof File);
        setImages(filteredImages);

        mutate("/profile/info");
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!images.length) return;
    const formData = new FormData();

    images.map((image) => {
      //instance of file only
      if (image instanceof File) {
        formData.append("media[]", image);
      }
    });
    formData.append("business_uid", business?.uid || "");

    try {
      setIsLoading(true);
      const res = await updateMediaAction(formData);
      toast({
        description: res?.message,
        variant: res.status ? "default" : "destructive",
      });
      setImages([]);
      mutate("/profile/info");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <TitleAndDescription
        title="Workplace/Store Images"
        description="Add your media images"
      />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#25324B]">Media</h3>
          <div className="flex gap-2">
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditMode(!isEditMode)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-6 grid-cols-4 gap-4">
          {images &&
            images?.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ">
                  <Image
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : image.asset_path
                    }
                    alt={image instanceof File ? image.name : "media"}
                    width={100}
                    height={100}
                    className="object-contain p-2 w-full h-full"
                  />
                </div>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteImage(index, image)}
                    isLoading={isDeleting}
                    className="absolute w-6 h-6 -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X
                      className={cn(
                        "h-4 w-4",
                        isDeleting && "cursor-not-allowed animate-spin"
                      )}
                    />
                  </Button>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          isLoading={isLoading}
          onClick={handleSaveChanges}
          className="bg-[#2B3479] text-white hover:bg-[#232a61] h-[48px]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
