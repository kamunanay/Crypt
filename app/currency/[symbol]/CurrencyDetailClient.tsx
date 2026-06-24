'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../../services/forex';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import Converter from '../../../components/ui/converter';
import { motion } from 'framer-motion';

export default function CurrencyDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const map: Record<string, { pair: string; rate: number; color: string; label: string }> = {
    usd: { pair: 'USD/IDR', rate: data?.usdIdr || 0, color: '#f5c842', label: 'US Dollar' },
    eur: { pair: 'EUR/IDR', rate: data?.eurIdr || 0, color: '#4a8fe7', label: 'Euro' },
    gbp: { pair: 'GBP/IDR', rate: data?.gbpIdr || 0, color: '#2d8b7a', label: 'British Pound' },
    jpy: { pair: 'JPY/IDR', rate: data?.jpyIdr || 0, color: '#d43f3f', label: 'Japanese Yen' },
    aud: { pair: 'AUD/IDR', rate: data?.audIdr || 0, color: '#cc7a3a', label: 'Australian Dollar' },
    chf: { pair: 'CHF/IDR', rate: data?.usdIdr || 0, color: '#bf1e1e', label: 'Swiss Franc' },
    cny: { pair: 'CNY/IDR', rate: data?.usdIdr || 0, color: '#c41e3a', label: 'Chinese Yuan' },
  };

  const info = map[symbol.toLowerCase()];

  return (
    <div className="min-h-screen bg-gradient-primary pt-[88px] px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
            {symbol.toUpperCase()} / IDR
          </h1>
          <p className="text-white/40 text-sm mt-1">{info?.pair} · {info?.label}</p>
        </motion.div>

        <div className="mb-8">
          <CardPremium
            title={info?.pair || ''}
            value={info?.rate ? info.rate.toLocaleString('id-ID') : '...'}
            change="+0.42%"
            positive
            loading={isLoading}
            color={info?.color}
            large
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceChart symbol={`${symbol.toUpperCase()}/IDR`} />
          <Converter defaultFrom={symbol.toUpperCase()} defaultTo="IDR" />
        </div>
      </div>
    </div>
  );
}
