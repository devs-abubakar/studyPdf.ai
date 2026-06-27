"use client";

import { useState } from "react";
import signUpNewUser from "@/actions/auth/signUp-action";
import Link from "next/link";
import { Eye, EyeOff, BookOpen, CheckCircle2, XCircle } from "lucide-react";

// Password strength checker
function getPasswordStrength(password) {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/4' };
    if (score <= 2) return { label: 'Fair', color: 'bg-yellow-400', width: 'w-2/4' };
    if (score <= 3) return { label: 'Good', color: 'bg-blue-400', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-green-400', width: 'w-full' };
}

export default function SignUpPage() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null); // true = success, false = error
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [touched, setTouched] = useState({});

    const strength = getPasswordStrength(password);
    const passwordsMatch = password && confirmPassword && password === confirmPassword;
    const passwordMismatch = confirmPassword && password !== confirmPassword;

    function validate(formData) {
        const username = formData.get('username')?.trim();
        const email = formData.get('email')?.trim();

        if (!username || username.length < 2) return 'Name must be at least 2 characters.';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email.';
        if (!password || password.length < 8) return 'Password must be at least 8 characters.';
        if (password !== confirmPassword) return 'Passwords do not match.';
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const clientError = validate(formData);
        if (clientError) {
            setStatus(false);
            setMessage(clientError);
            return;
        }

        setLoading(true);
        setMessage("");

        const res = await signUpNewUser(formData);

        setStatus(res.status);
        setMessage(res.message);
        setLoading(false);
    }

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
                            Create your account
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Free to use · No credit card required
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                        {/* Name */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                                Name
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                minLength={2}
                                maxLength={50}
                                autoComplete="name"
                                disabled={loading}
                                onBlur={() => setTouched(t => ({ ...t, username: true }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                placeholder="Your name"
                            />
                        </div>

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
                                disabled={loading}
                                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={8}
                                    disabled={loading}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                    placeholder="Min. 8 characters"
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

                            {/* Password strength bar */}
                            {password && (
                                <div className="mt-2">
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{strength.label} password</p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    required
                                    disabled={loading}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    onBlur={() => setTouched(t => ({ ...t, confirm: true }))}
                                    autoComplete="new-password"
                                    className={`w-full px-4 py-3 pr-12 rounded-xl border outline-none transition text-sm disabled:opacity-60 disabled:cursor-not-allowed
                                        ${passwordMismatch
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : passwordsMatch
                                                ? 'border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                                                : 'border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20'
                                        }`}
                                    placeholder="Repeat your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(s => !s)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#831C91] transition"
                                    tabIndex={-1}
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {passwordMismatch && touched.confirm && (
                                <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
                            )}
                            {passwordsMatch && (
                                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                    <CheckCircle2 size={11} /> Passwords match
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || passwordMismatch}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF70BF] to-[#831C91] text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : 'Create account'}
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
                        Already have an account?{' '}
                        <Link
                            href="/signIn"
                            className="font-semibold text-brand-purple hover:text-shadow-brand-pink transition"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-300 mt-6 uppercase tracking-widest font-semibold">
                    Your data stays in your account
                </p>
            </div>
        </div>
    );
}