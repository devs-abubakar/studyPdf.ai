import { NextResponse } from "next/server"
import { PdfSchema } from "@/app/lib/pdf/pdf-schema"
import React from 'react'
import { renderToBuffer } from "@react-pdf/renderer" // Ensure this is imported
import { PdfTemplate } from "@/app/component/pdf/PdfTemplate"
import { createServiceClient } from "@/app/lib/supabase/service"

export async function POST(req) {
  const supabase = createServiceClient()
  console.log("PDF generation route hit")

  try {
    const jsonBody = await req.json()
    const parsed = PdfSchema.safeParse(jsonBody)
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Data structure not valid" }, { status: 400 })
    }

    const fileData = parsed.data;
    const buffer = await renderToBuffer(
      React.createElement(PdfTemplate, { data: fileData })
    )
    
    const { data, error } = await supabase.storage
      .from('studyPdfFiles')
      .upload(`generated_${Date.now()}_${fileData.filename}`, buffer, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('studyPdfFiles')
      .getPublicUrl(data.path)
    
    console.log("saved to supabase")
    return NextResponse.json({
      success: true,
      pdfData: {
        filename: fileData.filename,
        title: fileData.title || "Your Custom Study Guide",
        downloadUrl: publicUrl
      }
    })

  } catch (e) {
    console.error("Internal PDF Compiler Route Crash:", e)
    return NextResponse.json({ error: "Compilation Pipeline Failed" }, { status: 500 })
  }
}