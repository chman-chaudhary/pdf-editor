// pdfjs-dist.d.ts
declare module "pdfjs-dist/build/pdf" {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(
    source: string | object | Uint8Array | ArrayBuffer
  ): {
    promise: Promise<PDFDocumentProxy>;
  };

  export interface PDFDocumentProxy {
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getViewport(params: { scale: number }): PDFViewport;
    render(params: {
      canvasContext: CanvasRenderingContext2D;
      viewport: PDFViewport;
    }): PDFRenderTask;
  }

  export interface PDFViewport {
    width: number;
    height: number;
  }

  export interface PDFRenderTask {
    promise: Promise<void>;
    cancel?(): void;
  }
}
