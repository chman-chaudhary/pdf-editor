"use client";

import { createContext, useContext, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { PageMetadata } from "@/types";

interface PDFContextType {
  pages: PageMetadata[];
  setPages: React.Dispatch<React.SetStateAction<PageMetadata[]>>;
  handleFileUpload: (files: File[]) => Promise<void>;
  handleDeletePage: (targetPage: PageMetadata) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const usePDFContext = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error("usePDFContext must be used within a PDFProvider");
  }
  return context;
};

export const PDFProvider = ({ children }: { children: React.ReactNode }) => {
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
          pdfName: files[i].name,
        });
      }
    }

    setPages(allPages);
    console.log("Updated pages:", allPages);
  };

  const handleDeletePage = (targetPage: PageMetadata) => {
    setPages((prevPages: PageMetadata[]) =>
      prevPages.filter(
        (p) =>
          !(
            p.pdfIndex === targetPage.pdfIndex &&
            p.pageIndex === targetPage.pageIndex &&
            p.originalPdfBytes === targetPage.originalPdfBytes &&
            p.pdfName === targetPage.pdfName
          )
      )
    );
  };

  return (
    <PDFContext.Provider
      value={{ pages, setPages, handleFileUpload, handleDeletePage }}
    >
      {children}
    </PDFContext.Provider>
  );
};
