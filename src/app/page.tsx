"use client";

import FileUploader from "@/components/FileUploader";
import HeroNavbar from "@/components/HeroNavbar";
import Image from "next/image";

const Page = () => {
  return (
    <main className="relative w-full h-screen mx-auto flex items-center justify-center px-20">
      <HeroNavbar />
      <section className="w-[45%] h-[80%] flex flex-col items-start justify-end pb-10 space-y-2">
        <div className="w-[80%] flex justify-center items-center">
          <Image src="/logo/icons-96.png" width={180} height={180} alt="logo" />
        </div>
        <div className="w-full">
          <h1 className="text-7xl font-bold">
            PDF Merge <br />& Reorder
          </h1>
          <h3 className="text-2xl font-medium">100% Automatically and Free</h3>
        </div>
      </section>
      <section className="w-[45%] h-[80%] flex flex-col justify-end">
        <FileUploader />
      </section>
    </main>
  );
};

export default Page;
