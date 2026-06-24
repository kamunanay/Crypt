'use client';

import { useQuery } from '@tanstack/react-query';
import { getGoldPrice } from '../../services/gold';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import CoinDisplay from '../../components/ui/coin-display';
import { motion } from 'framer-motion';

export default function EmasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gold'],
    queryFn: getGoldPrice,
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-gradient-primary pt-[72px]">
      <div className="relative overflow-hidden px-4 md:px-8 py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0d1a] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-wider uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Precious Metal
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                  <span className="text-[#0b0d1a] text-lg font-bold font-display">C</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold font-display">
                  Emas
                </h1>
              </div>
              <p className="text-white/40 text-lg mt-2 font-light tracking-wide">
                Gold price · XAU/USD
              </p>
            </div>
            <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
              <CoinDisplay symbol="Au" label="Gold" color="#f5c842" isGold />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <CardPremium
            title="XAU/USD"
            subtitle="Gold Spot"
            value={data?.price ? `$${data.price.toLocaleString()}` : '...'}
            change="+0.32%"
            positive
            loading={isLoading}
            color="#f5c842"
            gold
          />
          <div className="glass rounded-2xl p-6 flex items-center justify-center">
            <div className="w-[250px] h-[250px]">
              <CoinDisplay symbol="Au" label="Gold" color="#f5c842" isGold />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="glass rounded-2xl p-6">
            <PriceChart symbol="XAU/USD" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
