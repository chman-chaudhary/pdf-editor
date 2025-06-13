import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeroNavbar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between py-4 px-8 border-b border-gray-300/60 cursor-pointer">
      <div className="flex justify-center items-end gap-x-2 text-2xl font-bold">
        <Image src="/logo/icons-32.png" width={32} height={32} alt="logo" />
        <span>PDF Merger & Reorder</span>
      </div>
      <Menu className="size-8" />
    </div>
  );
};

export default HeroNavbar;
