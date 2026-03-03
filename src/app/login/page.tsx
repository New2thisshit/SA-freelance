'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-md glass-card p-8 md:p-10 relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold text-gradient font-display tracking-tight hover:opacity-80 transition-opacity">
                        FindWork SA
                    </Link>
                    <h1 className="text-2xl font-semibold mt-6 mb-2">Welcome Back</h1>
                    <p className="text-slate-500 text-sm">Log in to your account and continue working.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-100 rounded-xl">
                            {state.error}
                        </div>
                    )}

                    <div className="space-y-2 text-left">
                        <label htmlFor="email" className="text-sm font-medium pl-1">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center pl-1">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Link href="/forgot-password" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-400 text-white rounded-xl font-semibold text-base transition-all shadow-md hover:shadow-lg mt-2"
                    >
                        {isPending ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                            Sign up today
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
