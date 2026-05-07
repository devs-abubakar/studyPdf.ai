"use client";

import { useState } from "react";
import signUpNewUser from "@/actions/auth/signUp-action";

export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await signUpNewUser(formData);

    setMessage(res.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCFB] px-6">
      <div className="w-full max-w-md bg-white border border-[rgba(255,112,191,0.15)] rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#831C91] tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Start learning smarter with AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="username"
              type="text"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition"
              placeholder="you@example.com"
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
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF70BF] focus:ring-2 focus:ring-[#FF70BF]/20 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF70BF] to-[#831C91] text-white font-semibold hover:opacity-90 active:scale-[0.98] transition"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-[#831C91] mt-5">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}