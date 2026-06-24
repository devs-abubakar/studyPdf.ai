"use client";

import { logInUser } from "@/actions/auth/logIn-action";
import { supabase } from "@/app/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignInPage = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("idle");
  const signInWithGoogle = async() =>{
    setLoading("google")
    try{
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options:{
        redirectTo:`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      }
    })
    setLoading("idle")
    }catch(e){
      console.error(e)
      setMessage("Failed to sign in with Google")
      setLoading("idle")
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading("email");

    const formData = new FormData(e.currentTarget);
    const res = await logInUser(formData);

    setMessage(res.message);
    setLoading("idle");

    if (res.success) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCFB] px-6">
      <div className="w-full max-w-md bg-white border border-[rgba(255,112,191,0.15)] rounded-3xl p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#831C91] tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue learning with AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF70BF] to-[#831C91] text-white font-semibold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-70"
          >
            {loading=== "email" ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signUp"
            className="font-medium text-[#831C91] hover:text-[#FF70BF] transition"
          >
            Sign up
          </Link>
        </p>
        <button className="font-bold" onClick={signInWithGoogle}>
          continue with google
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-[#831C91] mt-5">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInPage;