'use client';

import { motion } from "framer-motion";
import { ParticlesContainer as Particles } from "@/components/Particles";
import RiskSlider from "@/components/RiskSlider";
import Image from "next/image";
import SubscribeForm from '@/components/SubscribeForm';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white overflow-x-hidden">
      <Particles className="absolute inset-0" />
      
      {/* Glass morphism container */}
      <div className="relative container mx-auto px-4 py-8 sm:py-16 mt-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Section - Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 sm:gap-8 max-w-xl"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block">
                <motion.span
                  className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Coming Soon 🚀
                </motion.span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
                Trade Smarter with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-800 animate-gradient">
                  AI-Powered Yields
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Experience the future of automated trading with Spinor. Our AI agent 
                optimizes your LST-LRT trades 24/7 for maximum returns on Gelato.
              </p>
            </div>

            <SubscribeForm />

            {/* Built on top of section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-base font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                  BUILT ON TOP OF
                </p>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <Image
                  src="/celestia.png"
                  alt="Celestia"
                  width={140}
                  height={28}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <Image
                  src="/encode.png"
                  alt="Encode"
                  width={80}
                  height={15}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 -translate-y-1"
                />
                <Image
                  src="/gelato.png"
                  alt="Gelato"
                  width={120}
                  height={28}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Section - Interactive Demo */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:order-last"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
            <RiskSlider />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
