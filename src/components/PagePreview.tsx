"use client";

import { useEffect, useRef } from "react";
import { PageMetadata } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

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
      const viewport = page.getViewport({ scale: 0.35 });

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
    <div className="relative w-fit border shadow-lg focus-within:border-primary hover:border-primary rounded-sm overflow-hidden p-0">
      <canvas ref={canvasRef} className="block w-full h-full m-0 p-0" />

      {/* Footer with PDF name and menu */}
      <div className="absolute bottom-0 left-0 w-full bg-white z-10 flex items-center justify-between px-4 py-3 border-t border-gray-400/60">
        <p className="w-full text-sm text-gray-800 truncate font-semibold text-center overflow-hidden">
          {pageMeta.pdfName} - {pageMeta.pageIndex + 1}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded focus:outline-none">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDelete?.(pageMeta)}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PDFPagePreview;
