"use client";

import { Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button } from "./ui/button";
import { usePDFContext } from "@/context/PDFContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MergeButtonProps {
  filename: string;
  setFilename: (name: string) => void;
}

const MergeButton: React.FC<MergeButtonProps> = ({ filename, setFilename }) => {
  const { pages, setPages } = usePDFContext();

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
    a.download = filename + ".pdf";
    a.click();

    URL.revokeObjectURL(url);
    setPages([]); // Clear pages after download
    setFilename("New Merged File"); // Reset filename
  };

  return (
    <Dialog>
      <form onSubmit={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <Button>
            <Download className="mr-1" />
            Download
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download Merged PDF</DialogTitle>
            <DialogDescription>
              Enter a name for your merged PDF file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">File name</Label>
              <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={filename == ""}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleMerge}>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default MergeButton;
