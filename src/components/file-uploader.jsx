"use client";

import { useCallback } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export function FileUploader({ imageUrl, onFieldChange, setFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div
          className="flex flex-center flex-col py-5 text-grey-500 W-full 
        justify-center items-center w-full h-full
        border-dashed border-2 border-grey-300 rounded-xl bg-grey-100
        box-border cursor-pointer animate-pulse
        "
        >
          <h3 className="mb-2 mt-2">Drag & drop</h3>
          <p className="p-medium-12 mb-4">WEBP, PNG, JPG, JPEG</p>
          <Button type="button" className="rounded-full ">
            Browse
          </Button>
        </div>
      )}
    </div>
  );
}
