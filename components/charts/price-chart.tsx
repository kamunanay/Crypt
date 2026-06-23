'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, CandlestickData, Time } from 'lightweight-charts';

interface PriceChartProps {
  symbol: string;
  timeframe?: '1D' | '1W' | '1M' | '3M' | '1Y';
}

export default function PriceChart({ symbol, timeframe = '1D' }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'rgba(0,0,0,0)' },
        textColor: 'rgba(255,255,255,0.5)',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.05)' },
        horzLines: { color: 'rgba(255,255,255,0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.1)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.1)', timeVisible: true },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4cd9a0',
      downColor: '#f87171',
      borderUpColor: '#4cd9a0',
      borderDownColor: '#f87171',
      wickUpColor: '#4cd9a0',
      wickDownColor: '#f87171',
    });

    // Data dummy
    const data: CandlestickData<Time>[] = [];
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    let price = 16320;

    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.5) * 200;
      price += change;
      data.push({
        time: (now - (30 - i) * day) / 1000 as Time,
        open: price - 50 + Math.random() * 50,
        high: price + 50 + Math.random() * 50,
        low: price - 50 - Math.random() * 50,
        close: price,
      });
    }

    candlestickSeries.setData(data);

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [symbol, timeframe]);

  return (
    <div className="rounded-2xl p-4 bg-white/5 backdrop-blur-xl border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/60">{symbol}</span>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <button
              key={tf}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                timeframe === tf
                  ? 'bg-[#f5c842]/20 text-[#f5c842]'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}
