"use server"
import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'


export default async function signUpNewUser(formData) {
    const supabase = await createClient()
    const email = formData.get('email')
    const password = formData.get('password')
    const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        emailRedirectTo: `${NEXT_PUBLIC_APP_URL}/auth/callback`
    }
    })
    console.log(data)
    if (error){
        console.log(error)
        return {status : false ,message:error.message}
    }
    return {status : true, message:"Please check your email"}
}   