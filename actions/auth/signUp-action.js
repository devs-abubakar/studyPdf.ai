"use server"
import { supabase } from '@/app/lib/vectorStore'
import { redirect } from 'next/navigation'


export default async function signUpNewUser(formData) {

    const email = formData.get('email')
    const password = formData.get('password')
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(data)
    if (error){
        console.log(error)
        return(error.message)
    }
    redirect('/dashboard')
}   