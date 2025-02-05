import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const UploadImages = ({uploadedFiles, setUploadedFiles}: {uploadedFiles: File[], setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>}) => {
 

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleDelete = (fileIndex: number) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== fileIndex)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5 , 
  });

  return (
    <div className="shadow-grid-item bg-white p-4 lg:p-7 rounded-[12px]">
      <h1 className="text-sm font-bold text-[#1D1B23] mb-4">Upload Images</h1>
      <div
        {...getRootProps()}
        className={`border-dashed border-2  border-[#717579] rounded-md p-4 md:p-6 h-[300px] flex flex-center justify-center ${
          isDragActive ? "border-c-blue bg-blue-50" : "border-[#717579]"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center p-4 bg-[#EEEEEE] w-full h-full cursor-pointer">
          <Image
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
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="relative border border-gray-300 p-2 rounded-md"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
              width={80}
              height={80}
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
