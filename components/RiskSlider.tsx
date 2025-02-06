'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, TrendingUp } from 'lucide-react';

export default function RiskSlider() {
  const [risk, setRisk] = useState(2);
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState('3 Months');
  const [projectedReturn, setProjectedReturn] = useState(0);

  const riskLevels = [
    { value: 1, apy: 0.05, label: "Conservative" },
    { value: 2, apy: 0.08, label: "Moderate" },
    { value: 3, apy: 0.12, label: "Dynamic" },
    { value: 4, apy: 0.15, label: "Aggressive" },
  ];

  const durations = ['1 Month', '3 Months', '6 Months', '1 Year'];
  const durationMultiplier = {
    '1 Month': 1/12,
    '3 Months': 0.25,
    '6 Months': 0.5,
    '1 Year': 1
  };

  const currentLevel = riskLevels[risk - 1];

  useEffect(() => {
    const apy = currentLevel.apy;
    const years = durationMultiplier[duration];
    const projected = amount * (1 + apy * years);
    setProjectedReturn(projected - amount);
  }, [amount, risk, duration, currentLevel.apy]);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-5 border border-white/5">
      <div className="space-y-5">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-base font-medium text-white">Investment Amount</label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-lg text-white font-medium focus:outline-none focus:border-white/30"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Duration Pills */}
        <div className="space-y-2">
          <label className="text-base font-medium text-white">Investment Period</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  duration === d 
                    ? 'bg-white/15 text-white shadow-lg' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-white" />
              <span className="text-base font-medium text-white">Risk Level</span>
            </div>
            <span className="text-base font-semibold text-white">
              {(currentLevel.apy * 100).toFixed(1)}% APY
            </span>
          </div>

          <div className="relative">
            <div className="flex justify-between gap-2">
              {riskLevels.map((level, index) => (
                <button
                  key={level.value}
                  onClick={() => setRisk(level.value)}
                  className={`relative flex-1 h-2 rounded-full overflow-hidden transition-all duration-300 ${
                    index < risk ? 'bg-white' : 'bg-white/10'
                  } ${index === risk - 1 ? 'scale-y-[1.5]' : ''}`}
                />
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={risk}
              step="1"
              onChange={(e) => setRisk(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="text-base font-medium text-white">
            {currentLevel.label}
          </div>
        </div>

        {/* Projected Return */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-xl" />
          <div className="relative text-center bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={18} className="text-white" />
              <div className="text-base font-medium text-white">Projected Return</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                ${projectedReturn.toFixed(2)}
              </div>
              <div className="text-sm text-white/60">
                {duration} @ {(currentLevel.apy * 100).toFixed(1)}% APY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 