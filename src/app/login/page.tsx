"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase } from "lucide-react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-emerald-500 text-white p-2 rounded-xl group-hover:bg-emerald-600 transition-colors">
                            <Briefcase size={24} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                            SprintSA
                        </span>
                    </Link>
                </div>

                <Card className="border-slate-200/50 shadow-xl dark:border-slate-800/50 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>Log in to your account and continue working.</CardDescription>
                    </CardHeader>

                    <form action={formAction}>
                        <CardContent className="space-y-4">
                            {state?.error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20"
                                >
                                    {state.error}
                                </motion.div>
                            )}

                            <div className="space-y-2 text-left">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full"
                            >
                                {isPending ? 'Logging In...' : 'Log In'}
                            </Button>

                            <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 font-semibold hover:underline">
                                    Sign up today
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
