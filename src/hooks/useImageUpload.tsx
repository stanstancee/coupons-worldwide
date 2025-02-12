"use client";

import { useState, useCallback } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";

export function useImageUpload() {
  const [image, setImage] = useState<File | string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        console.error("File rejected:", rejectedFiles[0].errors);
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        setImage(file);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  return { image, getRootProps, getInputProps, isDragActive, setImage };
}
