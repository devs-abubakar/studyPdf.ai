import { NextResponse } from "next/server";
export async function POST(req){
    const data = await req.formData();
    console.log(data)
    const file = data.get("file");
    if(!file){
        return NextResponse.json({success:false})
    }
    console.log(file)
    return NextResponse.json({success:true})
}