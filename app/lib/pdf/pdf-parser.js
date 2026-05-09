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
  const uploadDir = path.join(process.cwd(), "tmp");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, `${randomUUID()}.pdf`);
  fs.writeFileSync(filePath, buffer);
  
  // 3. Load PDF into Documents
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  
  fs.unlinkSync(filePath)

  return docs;
}