'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../services/forex';
import CardPremium from '../components/ui/card-premium';
import PriceChart from '../components/charts/price-chart';
import Converter from '../components/ui/converter';
import { motion } from 'framer-motion';

export default function ForexPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const pairs = [
    { from: 'USD', to: 'IDR', rate: data?.usdIdr, color: '#f5c842', label: 'US Dollar' },
    { from: 'EUR', to: 'IDR', rate: data?.eurIdr, color: '#4a8fe7', label: 'Euro' },
    { from: 'GBP', to: 'IDR', rate: data?.gbpIdr, color: '#2d8b7a', label: 'British Pound' },
    { from: 'JPY', to: 'IDR', rate: data?.jpyIdr, color: '#d43f3f', label: 'Japanese Yen' },
    { from: 'AUD', to: 'IDR', rate: data?.audIdr, color: '#cc7a3a', label: 'Australian Dollar' },
  ];

  const now = new Date();
  const timestamp = now.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gradient-primary pt-[88px] px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">Forex</h1>
          <p className="text-white/40 text-sm mt-1">Major currency pairs · {timestamp} WIB</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {pairs.map((pair, i) => (
            <motion.div key={pair.from} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CardPremium
                title={`${pair.from}/${pair.to}`}
                subtitle={pair.label}
                value={pair.rate ? pair.rate.toLocaleString('id-ID') : '...'}
                change="+0.42%"
                positive
                loading={isLoading}
                color={pair.color}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PriceChart symbol="USD/IDR" />
          <Converter />
        </div>
      </div>
    </div>
  );
}
