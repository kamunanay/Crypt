'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, CandlestickData, Time } from 'lightweight-charts';

export default function PriceChart({ symbol, timeframe = '1D' }: { symbol: string; timeframe?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [selectedTF, setSelectedTF] = useState(timeframe);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: 'rgba(0,0,0,0)' }, textColor: 'rgba(255,255,255,0.5)' },
      grid: { vertLines: { color: 'rgba(255,255,255,0.05)' }, horzLines: { color: 'rgba(255,255,255,0.05)' } },
      width: containerRef.current.clientWidth,
      height: 320,
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.1)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.1)', timeVisible: true },
    });
    chartRef.current = chart;
    const series = chart.addCandlestickSeries({
      upColor: '#4cd9a0',
      downColor: '#f87171',
      borderUpColor: '#4cd9a0',
      borderDownColor: '#f87171',
      wickUpColor: '#4cd9a0',
      wickDownColor: '#f87171',
    });

    // Generate data berdasarkan timeframe
    const count = selectedTF === '1D' ? 30 : selectedTF === '1W' ? 60 : selectedTF === '1M' ? 90 : selectedTF === '3M' ? 180 : 365;
    const data: CandlestickData<Time>[] = [];
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    let price = 16320;
    for (let i = 0; i < count; i++) {
      const change = (Math.random() - 0.5) * 200;
      price += change;
      data.push({
        time: (now - (count - i) * day) / 1000 as Time,
        open: price - 50 + Math.random() * 50,
        high: price + 50 + Math.random() * 50,
        low: price - 50 - Math.random() * 50,
        close: price,
      });
    }
    series.setData(data);

    const resize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (chartRef.current) { chartRef.current.remove(); chartRef.current = null; }
    };
  }, [symbol, selectedTF]);

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/60">{symbol}</span>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTF(tf)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                selectedTF === tf ? 'bg-gold/20 text-gold' : 'text-white/30 hover:text-white/60'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} />
    </div>
  );
}
