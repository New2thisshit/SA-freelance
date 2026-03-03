"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Monitor, PenTool, TrendingUp, Video, ArrowRight, ShieldCheck, Zap, Globe, Briefcase } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center relative">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] opacity-70 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] opacity-70 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl space-y-8 relative z-10"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">The #1 Platform for SA Talent</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Find the right <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-indigo-500">freelance</span><br className="hidden md:block" />
              services, right away
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with vetted professionals across South Africa. High-quality work, delivered on time. Secure payments in ZAR natively with Paystack.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="w-full sm:w-auto h-14 text-lg px-8 rounded-full shadow-lg shadow-emerald-500/20">
                Find Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 text-lg px-8 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                Become a Freelancer
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {[
                { icon: ShieldCheck, title: "Vetted Professionals", desc: "Every freelancer goes through a strict identity and skill verification process.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                { icon: Zap, title: "Lightning Fast Delivery", desc: "Get matched with talent in minutes, not days. Start your project immediately.", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                { icon: Globe, title: "Local SA Focus", desc: "No exchange rates, no time zone issues. Pure South African talent working in ZAR.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" }
              ].map((feat, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${feat.bg} flex items-center justify-center mb-2`}>
                    <feat.icon className={`w-8 h-8 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Explore Categories</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Browse the most sought-after skills on the platform.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Web Development", desc: "Build modern, fast websites", icon: Monitor },
              { title: "Design & UX", desc: "Build your brand identity", icon: PenTool },
              { title: "Digital Marketing", desc: "Unlock growth and traffic", icon: TrendingUp },
              { title: "Video & Animation", desc: "Create engaging content", icon: Video },
            ].map((cat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }}>
                <Card className="h-full border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors text-slate-600 dark:text-slate-300">
                      <cat.icon size={24} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cat.title}</CardTitle>
                    <CardDescription>{cat.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 dark:bg-slate-950 border-t border-slate-800 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-6">
            <Briefcase size={20} className="text-emerald-500" />
            <span className="font-bold text-xl tracking-tight text-white">SprintSA</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SprintSA Freelance Marketplace. Designed for South Africa.
          </p>
        </div>
      </footer>
    </div>
  );
}
