/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import TitleAndDescription from "../ui/title-and-description";
import { updateMediaAction } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useDashboard } from "@/context/dashboard-context";



export default function TechStackManager() {
  const { business } = useDashboard();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Array<File>>([]);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImages((prevImages) => [...prevImages, file]);
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((image, i) => i !== index));
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

        <div className="grid grid-cols-6 gap-4">
          {images &&
            images?.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    width={100}
                    height={100}
                    className="object-contain p-2"
                  />
                </div>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
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
