import { createClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request){
    const supabase =await createClient()
    const requestUrl = new URL(request.url)
    console.log(requestUrl)
    const code = requestUrl.searchParams.get('code')
    console.log(code)
    if(code){
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))

}