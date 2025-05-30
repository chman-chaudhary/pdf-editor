"use client";

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

const FileUploader = ({ onUpload }: FileUploaderProps) => {
  return (
    <div>
      <input
        type="file"
        multiple
        accept=".pdf"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        onChange={(e) => e.target.files && onUpload(Array.from(e.target.files))}
      />
    </div>
  );
};

export default FileUploader;
