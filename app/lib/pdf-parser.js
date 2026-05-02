import fs from "fs";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import path from "path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import pdf from 'pdf-parse'


export async function parsePdf(file){
    // Loading the file  const 
    const buffer = Buffer.from(await file.arrayBuffer(file))

    const data = await pdf(buffer);
    console.log("========================")
    console.log(data);
    console.log("========================")

    return data.text;
}