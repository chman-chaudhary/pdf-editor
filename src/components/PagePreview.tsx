"use client";

import { useEffect, useRef } from "react";
import { PageMetadata } from "@/types";

interface PDFPagePreviewProps {
  pageMeta: PageMetadata;
  onDelete: (targetPage: PageMetadata) => void;
}

const PDFPagePreview: React.FC<PDFPagePreviewProps> = ({
  pageMeta,
  onDelete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderTask: pdfjsLib.PDFRenderTask | null = null;
    let cancelled = false;

    const loadPdf = async () => {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

      const loadingTask = pdfjsLib.getDocument({
        data: pageMeta.originalPdfBytes.slice().buffer,
      });

      const pdf = await loadingTask.promise;
      if (cancelled) return;

      const page = await pdf.getPage(pageMeta.pageIndex + 1);
      const viewport = page.getViewport({ scale: 0.5 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      renderTask = page.render({
        canvasContext: context!,
        viewport,
      });

      await renderTask.promise;
    };

    loadPdf();

    // Cleanup function
    return () => {
      cancelled = true;
      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
    };
  }, [pageMeta]);

  return (
    <div className="relative w-fit">
      <canvas ref={canvasRef} className="border rounded shadow" />
      <button
        onClick={() => onDelete?.(pageMeta)}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
        title="Delete page"
      >
        🗑️
      </button>
      <p className="text-sm text-center mt-2 text-black">
        PDF {pageMeta.pdfIndex + 1}, Page {pageMeta.pageIndex + 1}
      </p>
    </div>
  );
};

export default PDFPagePreview;
