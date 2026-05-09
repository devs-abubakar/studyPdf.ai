import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"]
const authRoutes = ["/signUp","/signIn"]

export async function updateSession(request){
    const path = request.nextUrl.pathname
    console.log("updateSession hit")
    const isProtected = protectedRoutes.some((r)=>{
        console.log("checking protected path : ",path)
        return path.startsWith(r)
    })
    const isAuth = authRoutes.some((r)=>{
        console.log("checking auth path : ",path)
        return path.startsWith(r)
    })
    let response = NextResponse.next({request})

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY,
        {
            cookies :{
                getAll(){ 
                    return request.cookies.getAll() 
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach((name,value,options)=>{
                        response.cookies.set(name,value,options)
                    })
                    
                }
            }
        }
    )
    const {data:{user}}=await supabase.auth.getUser()
    console.log(user)
    if (!user && isProtected){
        console.log("user is not valid and trying to access protected routes")
        return NextResponse.redirect(new URL("/signIn",request.url))
    }
    if (user && isAuth){
        console.log("user and isAuth is valid")
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }

    return response
}