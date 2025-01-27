"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Plus, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import TitleAndDescription from "../ui/title-and-description";

export default function TechStackManager() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [images, setImages] = useState<
    Array<{ id: number; url: string; alt: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //add to images
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        if (e.target && typeof e.target.result === "string") {
          const result = e.target.result as string;
          setImages((prevImages) => [
            ...prevImages,
            { id: Date.now(), url: result, alt: file.name },
          ]);
        }
      }
    };
    reader.readAsDataURL(file);








  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    // Add your save logic here
  };

  return (
    <div className="space-y-6">
      <TitleAndDescription
        title="Workplace/Store Images"
        description="Add your media images"
      />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#25324B]">Tech Stack</h3>
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

            images?.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    width={100}
                    height={100}
                    className="object-contain p-2"
                  />
                </div>
                {isEditMode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteImage(image.id)}
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
          onClick={handleSaveChanges}
          className="bg-[#2B3479] text-white hover:bg-[#232a61]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
