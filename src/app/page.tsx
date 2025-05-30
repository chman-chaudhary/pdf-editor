"use client";

import FileUploader from "@/components/FileUploader";
import MergeButton from "@/components/MergeButton";
import PageList from "@/components/PageList";
import PagePreview from "@/components/PagePreview";
import { PageMetadata } from "@/types";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";

const Page = () => {
  const [pages, setPages] = useState<PageMetadata[]>([]);

  const handleFileUpload = async (files: File[]) => {
    const pdfArrayBuffers = await Promise.all(
      files.map((file) => file.arrayBuffer())
    );

    const allPages: PageMetadata[] = [...pages];

    const currentMaxPdfIndex =
      pages.length > 0 ? Math.max(...pages.map((p) => p.pdfIndex)) : -1;

    for (let i = 0; i < pdfArrayBuffers.length; i++) {
      const bytes = new Uint8Array(pdfArrayBuffers[i]);
      const doc = await PDFDocument.load(bytes);
      const pageCount = doc.getPageCount();

      const newPdfIndex = currentMaxPdfIndex + 1 + i;

      for (let j = 0; j < pageCount; j++) {
        allPages.push({
          pdfIndex: newPdfIndex,
          pageIndex: j,
          originalPdfBytes: bytes,
        });
      }
    }

    setPages(allPages);
  };

  return (
    <main className="p-6 w-full mx-auto flex flex-col items-center gap-y-6">
      <h1 className="text-2xl font-bold mb-4">PDF Merge & Reorder</h1>
      <FileUploader onUpload={handleFileUpload} />
      <MergeButton pages={pages} />
      <PageList pages={pages} setPages={setPages} />
    </main>
  );
};

export default Page;
