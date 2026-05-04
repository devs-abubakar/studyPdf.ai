import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export async function parsePdf(file) {
  // 1. Convert File → Buffer
    console.log("hit parsepdf ")
    const bytes = await file.arrayBuffer();
    console.log(bytes)
    const buffer = Buffer.from(bytes);
    console.log(buffer)

  // 2. Save temporarily (required for PDFLoader fs version)
  const filePath = path.join(process.cwd(), `${randomUUID()}.pdf`);
  console.log(filePath)
  fs.writeFileSync(filePath, buffer);

  // 3. Load PDF into Documents
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  return docs;
}