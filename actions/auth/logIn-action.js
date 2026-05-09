"use server"
import {createClient} from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logInUser(formData){
    console.log(formData)
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email,password)
    const supabase = await createClient()
    if (!email || !password){
        return {succes : false, message : "email or password is missing"}
    }
    const {data , error} =await supabase.auth.signInWithPassword({
        email : email,
        password : password
    }
)
    if (error){
        return {succes : false, message : `Error occured : ${error}`}
    }
    redirect('/dashboard')

}