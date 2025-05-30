"use client";

import { PageMetadata } from "@/types";
import { PDFDocument } from "pdf-lib";

interface MergeButtonProps {
  pages: PageMetadata[];
}

const MergeButton: React.FC<MergeButtonProps> = ({ pages }) => {
  const handleMerge = async () => {
    // Logic to merge branches
    const mergedPdf = await PDFDocument.create();

    for (const page of pages) {
      const srcPdf = await PDFDocument.load(page.originalPdfBytes.slice());
      const [copiedPage] = await mergedPdf.copyPages(srcPdf, [page.pageIndex]);
      mergedPdf.addPage(copiedPage);
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleMerge}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Merge & Download
    </button>
  );
};

export default MergeButton;
