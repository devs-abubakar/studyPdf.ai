"use client";

import { UploadCloud } from "lucide-react";

export default function UploadZone() {
  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-violet-600 transition-colors">

      <UploadCloud className="mb-4 text-zinc-400" size={40} />

      <h3 className="text-lg font-semibold text-white">
        Upload PDF
      </h3>

      <p className="text-zinc-400 text-sm mt-2">
        Drag and drop your file here
      </p>

    </div>
  );
}