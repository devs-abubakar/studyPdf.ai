"use client"
import { logInUser } from '@/actions/auth/logIn-action'
import React, {useState} from 'react'
import Link from 'next/link'

const SignInPage = () => {

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
