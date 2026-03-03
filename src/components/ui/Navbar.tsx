"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Briefcase } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass border-b border-slate-200/50 dark:border-slate-800/50 py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="bg-emerald-500 text-white p-2 rounded-xl group-hover:bg-emerald-600 transition-colors"
                    >
                        <Briefcase size={22} strokeWidth={2.5} />
                    </motion.div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                        SprintSA
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/gigs" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 transition-colors">Find Work</Link>
                    <Link href="/freelancers" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 transition-colors">Find Talent</Link>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-500 dark:text-slate-300 transition-colors">Sign In</Link>
                    <Link href="/signup" passHref legacyBehavior>
                        <Button variant="default" size="sm" className="rounded-full">
                            Join Now
                        </Button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
}
