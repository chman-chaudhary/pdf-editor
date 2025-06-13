"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import MergeButton from "./MergeButton";
import Image from "next/image";

const EditorNavbar = () => {
  const [filename, setFilename] = useState<string>("New Merged PDF");

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div className="flex justify-center items-end gap-x-2">
        <Image src="/logo/icons-32.png" width={32} height={32} alt="logo" />
        <Input
          className="max-w-fit w-60 font-medium !text-xl !h-auto border-none shadow-none"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
      </div>
      <MergeButton filename={filename} setFilename={setFilename} />
    </div>
  );
};

export default EditorNavbar;
