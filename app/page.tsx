'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { ParticlesContainer as Particles } from "@/components/Particles";
import RiskSlider from "@/components/RiskSlider";
import TradeSimulator from "@/components/TradeSimulator";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white overflow-hidden">
      <Particles className="absolute inset-0" />
      
      {/* Glass morphism container */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 max-w-xl"
          >
            <div className="space-y-4">
              <div className="inline-block">
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Coming Soon 🚀
                </motion.span>
              </div>
              
              <h1 className="text-6xl font-bold tracking-tight leading-tight">
                Trade Smarter with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-800 animate-gradient">
                  AI-Powered Yields
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Experience the future of automated trading with Spinor. Our AI agent 
                optimizes your LST-LRT trades 24/7 for maximum returns on Gelato.
              </p>
            </div>

            {/* Enhanced Email Form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-purple-500 transition-all duration-300 outline-none text-lg"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Join Waitlist
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Early access to beta features</span>
              </div>
            </motion.form>
          </motion.div>

          {/* Right Section - Interactive Demo */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
            <div className="relative space-y-8 p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all duration-300">
              <RiskSlider />

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
