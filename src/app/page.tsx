// "use client";

import { Button } from "@/components/ui/button";

// import FileUploader from "@/components/FileUploader";
// import MergeButton from "@/components/MergeButton";
// import PageList from "@/components/PageList";
// import { PageMetadata } from "@/types";
// import { PDFDocument } from "pdf-lib";
// import { useState } from "react";

// const Page = () => {
//   const [pages, setPages] = useState<PageMetadata[]>([]);

//   const handleFileUpload = async (files: File[]) => {
//     const pdfArrayBuffers = await Promise.all(
//       files.map((file) => file.arrayBuffer())
//     );

//     const allPages: PageMetadata[] = [...pages];

//     const currentMaxPdfIndex =
//       pages.length > 0 ? Math.max(...pages.map((p) => p.pdfIndex)) : -1;

//     for (let i = 0; i < pdfArrayBuffers.length; i++) {
//       const bytes = new Uint8Array(pdfArrayBuffers[i]);
//       const doc = await PDFDocument.load(bytes);
//       const pageCount = doc.getPageCount();

//       const newPdfIndex = currentMaxPdfIndex + 1 + i;

//       for (let j = 0; j < pageCount; j++) {
//         allPages.push({
//           pdfIndex: newPdfIndex,
//           pageIndex: j,
//           originalPdfBytes: bytes,
//         });
//       }
//     }

//     setPages(allPages);
//   };

//   return (
//     <main className="p-6 w-full mx-auto flex flex-col items-center gap-y-6">
//       <h1 className="text-2xl font-bold mb-4">PDF Merge & Reorder</h1>
//       <FileUploader onUpload={handleFileUpload} />
//       <MergeButton pages={pages} />
//       <PageList pages={pages} setPages={setPages} />
//     </main>
//   );
// };

// export default Page;

const Page = () => {
  return (
    <main className="w-full h-screen mx-auto flex items-center justify-center px-20">
      <section className="w-[45%] h-[80%] flex flex-col justify-end pb-10 space-y-2">
        <h1 className="text-7xl font-bold">
          PDF Merge <br />& Reorder
        </h1>
        <h3 className="text-2xl font-medium">100% Automatically and Free</h3>
      </section>
      <section className="w-[45%] h-[80%] flex flex-col justify-end pb-10">
        <div className="w-full h-[22rem] relative shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-4xl bg-white">
          {/* Centered Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button className="text-2xl font-semibold px-10 py-7 rounded-full">
              Upload PDFs
            </Button>
          </div>

          {/* Span below the button, not centered */}
          <span className="absolute top-[65%] left-[50%] -translate-x-[50%] text-gray-600 font-medium">
            or drop PDFs
          </span>
        </div>
      </section>
    </main>
  );
};

export default Page;
