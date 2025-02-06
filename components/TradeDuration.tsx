'use client';

import { useState } from 'react';

export default function TradeDuration() {
  const durations = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
  const [selected, setSelected] = useState('3 Months');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Trading Duration</h3>
      <div className="flex flex-wrap gap-2">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => setSelected(duration)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selected === duration
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {duration}
          </button>
        ))}
      </div>
    </div>
  );
} 