"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, UserRound, Sparkles } from "lucide-react";

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden py-12">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg relative z-10"
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
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl">Create an Account</CardTitle>
                        <CardDescription className="text-base">Join the platform to hire or find work.</CardDescription>
                    </CardHeader>

                    <form action={formAction}>
                        <CardContent className="space-y-6">
                            {state?.error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20"
                                >
                                    {state.error}
                                </motion.div>
                            )}

                            {/* Role Selection */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex-1 cursor-pointer group">
                                    <input type="radio" name="role" value="client" className="peer sr-only" defaultChecked />
                                    <div className="w-full text-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 dark:peer-checked:bg-emerald-900/20 transition-all group-hover:border-emerald-200 dark:group-hover:border-emerald-800">
                                        <UserRound className="mx-auto mb-2 text-slate-400 peer-checked:text-emerald-500" size={24} />
                                        <div className="font-semibold text-slate-900 dark:text-white mb-1">I'm a Client</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">I want to hire talent</div>
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer group">
                                    <input type="radio" name="role" value="freelancer" className="peer sr-only" />
                                    <div className="w-full text-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 transition-all group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
                                        <Sparkles className="mx-auto mb-2 text-slate-400 peer-checked:text-indigo-500" size={24} />
                                        <div className="font-semibold text-slate-900 dark:text-white mb-1">I'm a Freelancer</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">I want to find work</div>
                                    </div>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" type="text" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" type="text" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Create a strong password" required />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 pt-4">
                            <Button type="submit" disabled={isPending} className="w-full text-base h-12">
                                {isPending ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                                Already have an account?{' '}
                                <Link href="/login" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 font-semibold hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
