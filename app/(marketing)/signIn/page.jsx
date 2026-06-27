"use client";

import { logInUser } from "@/actions/auth/logIn-action";
import { supabase } from "@/app/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff, BookOpen, CheckCircle2, XCircle } from "lucide-react";

// Google Icon SVG — no external dependency needed
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
);

const SignInPage = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState("idle"); // "idle" | "email" | "google"
    const [showPassword, setShowPassword] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [cooldown, setCooldown] = useState(0);

    // Redirect if already logged in
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) router.replace("/dashboard");
        };
        checkUser();
    }, [router]);

    // Cooldown timer for rate limiting
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const signInWithGoogle = async () => {
        setLoading("google");
        setMessage("");
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
                }
            });
            if (error) {
                setStatus(false);
                setMessage("Could not connect to Google. Please try again.");
            }
        } catch {
            setStatus(false);
            setMessage("Could not connect to Google. Please try again.");
        } finally {
            setLoading("idle");
        }
    };

    function validate(formData) {
        const email = formData.get('email')?.trim();
        const password = formData.get('password');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Please enter a valid email address.';
        }
        if (!password || password.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Frontend rate limiting
        if (cooldown > 0) {
            setStatus(false);
            setMessage(`Too many attempts. Try again in ${cooldown} seconds.`);
            return;
        }

        const formData = new FormData(e.currentTarget);

        const clientError = validate(formData);
        if (clientError) {
            setStatus(false);
            setMessage(clientError);
            return;
        }

        setLoading("email");
        setMessage("");

        const res = await logInUser(formData);

        // Track failed attempts for rate limiting
        if (!res.success) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 5) {
                setCooldown(30); // 30 second cooldown after 5 failed attempts
                setAttempts(0);
            }
        }

        setStatus(res.success);
        setMessage(res.message);
        setLoading("idle");

        if (res.success) {
            router.push("/dashboard");
        }
    }

    const isLoading = loading !== "idle";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCFB] px-6 py-12">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center shadow-lg">
                            <BookOpen size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-[#831C91]">
                            studyPdf<span className="text-[#D552A3]">.ai</span>
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-[rgba(255,112,191,0.15)] rounded-3xl p-8 shadow-xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-[#831C91] tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Sign in to continue learning
                        </p>
                    </div>

                    {/* Google OAuth — prominent position */}
                    <button
                        type="button"
                        onClick={signInWithGoogle}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mb-6"
                    >
                        {loading === "google" ? (
                            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                        ) : (
                            <GoogleIcon />
                        )}
                        {loading === "google" ? "Connecting..." : "Continue with Google"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                disabled={isLoading}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-[#D552A3] hover:text-[#831C91] transition"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(s => !s)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#831C91] transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading || cooldown > 0}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF70BF] to-[#831C91] text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            {loading === "email" ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : cooldown > 0 ? (
                                `Try again in ${cooldown}s`
                            ) : (
                                'Sign in'
                            )}
                        </button>

                    </form>

                    {/* Status message */}
                    {message && (
                        <div className={`mt-5 flex items-start gap-2 p-3 rounded-xl text-sm
                            ${status
                                ? 'bg-green-50 border border-green-100 text-green-700'
                                : 'bg-red-50 border border-red-100 text-red-600'
                            }`}
                        >
                            {status
                                ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                : <XCircle size={16} className="shrink-0 mt-0.5" />
                            }
                            {message}
                        </div>
                    )}

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't have an account?{" "}
                        <Link
                            href="/signUp"
                            className="font-semibold text-[#831C91] hover:text-[#FF70BF] transition"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;