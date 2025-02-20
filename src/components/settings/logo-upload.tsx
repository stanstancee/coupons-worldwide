import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Images } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";

interface LogoUploadProps {
  value?: File;
  onChange: (file?: File) => void;
  disabled?: boolean;
}

export function LogoUpload({ value, onChange, disabled }: LogoUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  const { business } = useDashboard();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg", ".gif"],
    },
    // maxSize 5mb

    maxSize: 500000,
    maxFiles: 1,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/10" : "border-muted",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />

      <div className="flex gap-4 items-center">
        <div className="relative w-16 h-16">
          <Image
            src={
              value
                ? URL.createObjectURL(value)
                : (business?.logo as string) || "/placeholder.jpg"
            }
            alt="Company logo"
            fill
            className="object-contain"
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 w-[303px] place-content-center place-items-center border border-dashed border-[#202871] p-4 rounded-md bg-[#F8F8FD]",
            isDragActive && "border-c-green"
          )}
        >
          <Images className="text-[#25324B]" />
          <p className="text-xs text-[#7C8493]">
            <strong className="text-[#25324B]">Click to replace</strong> or drag
            and drop SVG, PNG, JPG or GIF (max. 400 x 400px)
          </p>
        </div>
      </div>
    </div>
  );
}
