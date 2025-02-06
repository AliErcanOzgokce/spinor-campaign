'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="relative mx-auto px-6 py-2 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Spinor"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-2xl font-bold text-white font-display">
              spinor
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6 backdrop-blur-md bg-black/5 rounded-full px-2">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FileText size={18} />
                <span>Docs</span>
              </button>

              {/* Coming Soon Tooltip */}
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/90 text-white text-sm rounded-lg whitespace-nowrap"
                >
                  Coming Soon 🚀
                </motion.div>
              )}
            </div>

            <Link
              href="https://twitter.com/spinorfi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Twitter size={18} />
              <span>Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 