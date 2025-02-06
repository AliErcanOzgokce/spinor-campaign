'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function TradeSimulator() {
  const [data, setData] = useState({
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Simulated Returns',
        data: Array.from({ length: 12 }, () => Math.random() * 20 + 10),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(168, 85, 247)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projected Performance</h3>
        <div className="flex items-center gap-2">
          <span className="text-green-400">+24.5%</span>
          <span className="text-sm text-gray-400">Past 30 days</span>
        </div>
      </div>
      <div className="h-64 p-4 rounded-xl bg-black/20">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.05)',
                },
                border: {
                  display: false,
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.5)',
                }
              },
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.5)',
                }
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
} 