"use server"
import { createClient } from '@/app/lib/supabase/server'


const SAFE_ERRORS = {
    'User already registered': 'An account with this email already exists.',
    'Password should be at least 6 characters': 'Password must be at least 8 characters.',
    'Unable to validate email address: invalid format': 'Please enter a valid email address.',
    'Email rate limit exceeded': 'Too many attempts. Please try again later.',
}

function getSafeError(message) {
    return SAFE_ERRORS[message] || 'Something went wrong. Please try again.'
}

function validateInputs(email, password, username) {
    if (!email || !password || !username) {
        return 'All fields are required.'
    }
    if (username.trim().length < 2) {
        return 'Name must be at least 2 characters.'
    }
    if (username.trim().length > 50) {
        return 'Name must be under 50 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.'
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters.'
    }
    if (password.length > 128) {
        return 'Password is too long.'
    }
    return null 
}

export default async function signUpNewUser(formData) {
    const email = formData.get('email')?.toString().trim().toLowerCase()
    const password = formData.get('password')?.toString()
    const username = formData.get('username')?.toString().trim()


    const validationError = validateInputs(email, password, username)
    if (validationError) {
        return { status: false, message: validationError }
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
            data: {
                username: username, 
            }
        }
    })

    if (error) {
        return { status: false, message: getSafeError(error.message) }
    }

    if (data?.user && data.user.identities?.length === 0) {
        return { status: true, message: 'Check your email for a confirmation link.' }
    }

    return { status: true, message: 'Check your email for a confirmation link.' }
}