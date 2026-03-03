'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { signup } from '@/app/actions/auth';

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="w-full max-w-lg glass-card p-8 md:p-10 relative z-10 my-8">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-gradient font-display tracking-tight hover:opacity-80 transition-opacity">
                        FindWork SA
                    </Link>
                    <h1 className="text-2xl font-semibold mt-6 mb-2">Create an Account</h1>
                    <p className="text-slate-500 text-sm">Join the platform to hire or find work.</p>
                </div>

                <form action={formAction} className="space-y-5">
                    {state?.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-100 rounded-xl">
                            {state.error}
                        </div>
                    )}

                    {/* Role Selection */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="role" value="buyer" className="peer sr-only" defaultChecked />
                            <div className="w-full text-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                                <div className="font-semibold text-foreground mb-1">I'm a Buyer</div>
                                <div className="text-xs text-slate-500">I want to hire freelancers</div>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input type="radio" name="role" value="freelancer" className="peer sr-only" />
                            <div className="w-full text-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                                <div className="font-semibold text-foreground mb-1">I'm a Freelancer</div>
                                <div className="text-xs text-slate-500">I want to find freelance work</div>
                            </div>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2 text-left">
                            <label htmlFor="firstName" className="text-sm font-medium pl-1">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="John"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2 text-left">
                            <label htmlFor="lastName" className="text-sm font-medium pl-1">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Doe"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

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
                        <label htmlFor="password" className="text-sm font-medium pl-1">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-400 text-white rounded-xl font-semibold text-base transition-all shadow-md hover:shadow-lg mt-4"
                    >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
