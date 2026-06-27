"use server"
import { createClient } from '@/app/lib/supabase/server'


const SAFE_ERRORS = {
    'Invalid login credentials': 'Incorrect email or password.',
    'Email not confirmed': 'Please confirm your email before signing in.',
    'Too many requests': 'Too many attempts. Please wait a few minutes and try again.',
    'User not found': 'Incorrect email or password.', // same message — don't reveal if email exists
}

function getSafeError(message) {
    return SAFE_ERRORS[message] || 'Something went wrong. Please try again.'
}

function validateInputs(email, password) {
    if (!email || !password) {
        return 'Email and password are required.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.'
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters.'
    }
    return null
}

export async function logInUser(formData) {
    const email = formData.get('email')?.toString().trim().toLowerCase()
    const password = formData.get('password')?.toString()


    const validationError = validateInputs(email, password)
    if (validationError) {
        return { success: false, message: validationError }
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { success: false, message: getSafeError(error.message) }
    }


    return { success: true, message: 'Signed in successfully.' }
}