"use client"
import { logInUser } from '@/actions/auth/logIn-action'
import React, {useEffect} from 'react'
import Link from 'next/link'
import { supabase } from '@/app/lib/supabase/client'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'

const SignInPage =() => {
  const router = useRouter()
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkUser();
  }, [router]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData =new FormData(e.currentTarget)
        console.log(formData)
        const res = await logInUser(formData)
        console.log(res)
    }
  return (
    <div>
        <form onSubmit={handleSubmit} method="post">
        <label>Email </label>
        <input name='email' type="email" />
        <label> password </label>
        <input name='password' type='password'/>
        <button type="submit"> log in </button>
        <Link href="/signUp">Go to sign-Up</Link>

        </form>
    </div>
  )
}

export default SignInPage
