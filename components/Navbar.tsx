'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { useState } from 'react';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-[18px] h-[18px] ${className}`}>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export default function Navbar() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-black/5 backdrop-blur-md" />
      <div className="relative mx-auto px-4 sm:px-6 py-2 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">

              <Link href="/" className="relative flex items-center gap-2 sm:gap-3 group">
                <Image
                  src="/logo.png"
                  alt="Spinor"
                  width={32}
                  height={32}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
                <span className="text-xl sm:text-2xl font-bold text-white font-display">
                  spinor
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative">
              <button
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Docs</span>
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
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <XIcon className="translate-y-[1px] sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 