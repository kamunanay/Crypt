'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../services/forex';
import { motion } from 'framer-motion';

const currencies = [
  { code: 'CNY', label: 'Chinese Yuan', color: '#c41e3a' },
  { code: 'JPY', label: 'Japanese Yen', color: '#d43f3f' },
  { code: 'IDR', label: 'Indonesian Rupiah', color: '#8b6b4d' },
  { code: 'USD', label: 'US Dollar', color: '#f5c842' },
  { code: 'EUR', label: 'Euro', color: '#4a8fe7' },
  { code: 'GBP', label: 'British Pound', color: '#2d8b7a' },
];

export default function MarketGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const getRate = (code: string): number => {
    const map: Record<string, number> = {
      USD: 1,
      IDR: data?.usdIdr || 16322,
      EUR: data?.eurIdr || 17603,
      GBP: data?.gbpIdr || 20651,
      JPY: data?.jpyIdr || 104.52,
      CNY: data?.usdIdr ? data.usdIdr / 7.2 : 2268,
    };
    return map[code] || 0;
  };

  const formatRate = (code: string): string => {
    const rate = getRate(code);
    if (code === 'JPY') return rate.toFixed(2);
    if (code === 'IDR' || code === 'CNY') return rate.toLocaleString('id-ID');
    return rate.toFixed(2);
  };

  const getSymbol = (code: string): string => {
    const map: Record<string, string> = {
      CNY: '¥', JPY: '¥', IDR: 'Rp', USD: '$', EUR: '€', GBP: '£',
    };
    return map[code] || code;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {currencies.map((curr, i) => (
        <motion.div
          key={curr.code}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass rounded-2xl p-5 md:p-6 hover:border-gold/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          onClick={() => window.location.href = `/currency/${curr.code.toLowerCase()}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold text-white/90 group-hover:text-gold transition-colors">
                {curr.code}
              </div>
              <div className="text-xs text-white/30 mt-0.5 font-light tracking-wide">
                {curr.label}
              </div>
            </div>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${curr.color}40, ${curr.color}20)`,
                color: curr.color,
                border: `1px solid ${curr.color}30`
              }}
            >
              {getSymbol(curr.code)}
            </div>
          </div>
          <div className="mt-3">
            {isLoading ? (
              <div className="h-6 w-20 bg-white/5 rounded animate-pulse" />
            ) : (
              <>
                <div className="text-xl font-semibold text-white/90">
                  {formatRate(curr.code)}
                </div>
                <div className="text-xs text-green-400/70 mt-1 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  +0.14% today
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
