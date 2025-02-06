"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, DollarSign, TrendingUp, ChevronDown, RefreshCw } from "lucide-react";
import Image from "next/image";

const COIN_API_KEY = process.env.COIN_API_KEY;
const COIN_API_SYMBOLS = {
  'ETH': 'ETH',
  'TIA': 'TIA',
};

const tokens = [
  { 
    symbol: "TIA", 
    name: "Celestia", 
    logo: "/assets/tia.png",
    price: null
  },
  { 
    symbol: "ETH", 
    name: "Ethereum", 
    logo: "/assets/eth.png",
    price: null
  },
  { 
    symbol: "USDC", 
    name: "USD Coin", 
    logo: "/assets/usdc.png",
    price: 1
  },
];

type Duration = "1 Month" | "3 Months" | "6 Months" | "1 Year";

export default function RiskSlider() {
  const [risk, setRisk] = useState(2);
  const [amount, setAmount] = useState(1000);
  const [duration, setDuration] = useState<Duration>("3 Months");
  const [projectedReturn, setProjectedReturn] = useState(0);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [isTokenListOpen, setIsTokenListOpen] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  const riskLevels = [
    { value: 1, apy: 0.05, label: "Conservative" },
    { value: 2, apy: 0.08, label: "Moderate" },
    { value: 3, apy: 0.12, label: "Dynamic" },
    { value: 4, apy: 0.15, label: "Aggressive" },
  ];

  const durations = ["1 Month", "3 Months", "6 Months", "1 Year"];
  const durationMultiplier: Record<Duration, number> = {
    "1 Month": 1/12,
    "3 Months": 0.25,
    "6 Months": 0.5,
    "1 Year": 1
  };

  const currentLevel = riskLevels[risk - 1];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoadingPrices(true);
        
        const pricePromises = Object.entries(COIN_API_SYMBOLS).map(([symbol, apiSymbol]) =>
          fetch(`https://rest.coinapi.io/v1/exchangerate/${apiSymbol}/USD`, {
            headers: {
              'Accept': 'application/json',
              'X-CoinAPI-Key': COIN_API_KEY || ''
            }
          }).then(res => res.json())
        );

        const results = await Promise.all(pricePromises);
        
        const newPrices = results.reduce((acc, result, index) => {
          const symbol = Object.keys(COIN_API_SYMBOLS)[index];
          acc[symbol] = result.rate;
          return acc;
        }, {} as Record<string, number>);

        setPrices({
          ...newPrices,
          USDC: 1
        });
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setIsLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const apy = currentLevel.apy;
    const years = durationMultiplier[duration];
    const projected = amount * (1 + apy * years);
    setProjectedReturn(projected - amount);
  }, [amount, risk, duration, currentLevel.apy]);

  const formatReturn = (value: number, symbol: string) => {
    if (symbol === "USDC") return `$${value.toFixed(2)}`;
    return `${value.toFixed(4)} ${symbol}`;
  };

  const getUSDValue = (value: number, token: typeof tokens[0]) => {
    if (token.symbol === "USDC") return value;
    return value * (prices[token.symbol] || 0);
  };

  const projectedReturnUSD = getUSDValue(projectedReturn, selectedToken);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-white/5">
      <div className="space-y-4 sm:space-y-5">
        {/* Amount Input with Token Selector */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-medium text-white">
            Investment Amount
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />
            <div className="relative flex">
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-l-xl py-2 sm:py-3 px-3 sm:px-4 text-base sm:text-lg text-white font-medium focus:outline-none focus:border-pink-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter amount"
              />
              <div className="relative">
                <button
                  onClick={() => setIsTokenListOpen(!isTokenListOpen)}
                  className="h-full px-4 flex items-center gap-2 bg-white/5 border border-l-0 border-white/10 rounded-r-xl hover:bg-white/10 transition-colors"
                >
                  <Image
                    src={selectedToken.logo}
                    alt={selectedToken.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-white font-medium">
                    {selectedToken.symbol}
                  </span>
                  <ChevronDown size={16} className="text-white/70" />
                </button>

                {/* Token Dropdown */}
                {isTokenListOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50">
                    <div className="p-1">
                      {tokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setSelectedToken(token);
                            setIsTokenListOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Image
                            src={token.logo}
                            alt={token.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div className="text-left">
                            <div className="text-white font-medium">
                              {token.symbol}
                            </div>
                            <div className="text-xs text-white/60">
                              {token.name}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Duration Pills */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-medium text-white">
            Investment Period
          </label>
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d as Duration)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  duration === d
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
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
              <Shield size={16} className="text-pink-300/70" />
              <span className="text-base font-medium text-white">
                Risk Level
              </span>
            </div>
            <span className="text-base font-semibold text-pink-300">
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
                    index < risk
                      ? "bg-gradient-to-r from-pink-500 to-purple-500"
                      : "bg-white/10"
                  } ${index === risk - 1 ? "scale-y-[1.5]" : ""}`}
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
          <div className="text-base font-medium text-pink-300/90">
            {currentLevel.label}
          </div>
        </div>

        {/* Projected Return */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 blur-xl" />
          <div className="relative text-center bg-white/5 rounded-xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <div className="text-base font-medium text-white">
                Projected Return
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">
                {formatReturn(projectedReturn, selectedToken.symbol)}
              </div>
              {selectedToken.symbol !== "USDC" && (
                <AnimatePresence mode="wait">
                  {isLoadingPrices ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-lg text-emerald-400/90"
                    >
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Updating price...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="price"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-lg text-emerald-400/90"
                    >
                      ≈ ${projectedReturnUSD.toFixed(2)}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              <div className="text-sm text-emerald-400/70">
                {duration} @ {(currentLevel.apy * 100).toFixed(1)}% APY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
