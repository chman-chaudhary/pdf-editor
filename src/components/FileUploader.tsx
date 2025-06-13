"use client";

import React, { useRef } from "react";
import { usePDFContext } from "@/context/PDFContext";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const FileUploader = () => {
  const route = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload, pages, handleDeletePage } = usePDFContext();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const onClickUpload = () => {
    fileInputRef.current?.click();
  };

  const onClickMerge = () => {
    // Implement merge functionality here
    console.log("Merge PDFs functionality to be implemented");
    route.push("/editor");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(Array.from(files));
    }
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative w-full h-[22rem] border-dashed border-4 border-gray-300 flex flex-col items-center justify-center rounded-4xl bg-white shadow-lg cursor-pointer"
      onClick={onClickUpload}
    >
      <div className="absolute top-0 left-0 px-2 py-3 w-full h-full z-0">
        {pages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-center border rounded-2xl border-gray-500 text-gray-500 text-xs"
              >
                <span className="px-2 py-1 border-r border-gray-500">
                  {page.pdfName} - {page.pageIndex + 1}
                </span>
                <X
                  className="p-1 text-red-500 border-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePage(page);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <input
        type="file"
        accept="application/pdf"
        multiple
        hidden
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <div className="flex items-center justify-center gap-x-4 z-10">
        <Button
          className={`text-2xl font-semibold rounded-full py-6 px-8 ${
            pages.length > 0 && "text-base"
          }`}
          variant={pages.length == 0 ? "default" : "link"}
        >
          {pages.length == 0 ? "Upload PDFs" : "Add More PDFs"}
        </Button>
        {pages.length > 0 && (
          <Button
            className="text-2xl font-semibold rounded-full py-6 px-8"
            onClick={(e) => {
              e.stopPropagation();
              onClickMerge();
            }}
          >
            Merge
          </Button>
        )}
      </div>
      <span className="mt-4 text-gray-600 font-medium">
        or drag &amp; drop PDFs
      </span>
    </div>
  );
};

export default FileUploader;
