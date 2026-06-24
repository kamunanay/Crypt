'use client';

import { useQuery } from '@tanstack/react-query';
import { getGoldPrice } from '../services/gold';
import CardPremium from '../components/ui/card-premium';
import PriceChart from '../components/charts/price-chart';
import { motion } from 'framer-motion';

export default function EmasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gold'],
    queryFn: getGoldPrice,
    refetchInterval: 30000,
  });

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
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">Emas</h1>
          <p className="text-white/40 text-sm mt-1">Gold price · {timestamp} WIB</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <CardPremium
            title="XAU/USD"
            subtitle="Gold Spot"
            value={data?.price ? `$${data.price.toLocaleString()}` : '...'}
            change="+0.55%"
            positive
            loading={isLoading}
            color="#f5c842"
            gold
          />
          <div className="glass rounded-2xl p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🏆</div>
              <div className="text-gold text-3xl font-bold">
                {data?.price ? `$${data.price.toLocaleString()}` : '...'}
              </div>
              <div className="text-green-400 text-sm mt-2">+0.55% hari ini</div>
            </div>
          </div>
        </div>

        <PriceChart symbol="XAU/USD" />
      </div>
    </div>
  );
}
