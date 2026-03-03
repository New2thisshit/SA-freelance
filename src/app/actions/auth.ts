'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login(state: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    // Redirect to dashboard or home on success
    redirect('/dashboard');
}

export async function signup(state: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const role = formData.get('role') as string; // 'buyer' or 'freelancer'

    const supabase = await createClient();

    // Sign up the user and store their first name, last name, and role in user_metadata
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                role: role,
            },
        },
    });

    if (error) {
        return { error: error.message };
    }

    // On successful signup, redirect to a confirmation or dashboard page
    redirect('/dashboard');
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}
