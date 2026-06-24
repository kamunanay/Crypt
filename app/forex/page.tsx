'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../services/forex';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import Converter from '../../components/ui/converter';
import CoinDisplay from '../../components/ui/coin-display';
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
                Live Market
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                  <span className="text-[#0b0d1a] text-lg font-bold font-display">C</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold font-display">
                  Forex
                </h1>
              </div>
              <p className="text-white/40 text-lg mt-2 font-light tracking-wide">
                Major currency pairs · Real-time rates
              </p>
            </div>
            <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
              <CoinDisplay symbol="USD" label="Dollar" color="#f5c842" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {pairs.map((pair, i) => (
            <motion.div key={pair.from} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <CardPremium
                title={`${pair.from}/${pair.to}`}
                subtitle={pair.label}
                value={pair.rate ? pair.rate.toLocaleString('id-ID') : '...'}
                change="+0.14%"
                positive
                loading={isLoading}
                color={pair.color}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="glass rounded-2xl p-6">
            <PriceChart symbol="USD/IDR" />
          </div>
          <div className="glass rounded-2xl p-6 flex items-center justify-center">
            <div className="w-[280px] h-[280px]">
              <CoinDisplay symbol="IDR" label="Rupiah" color="#8b6b4d" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Converter />
        </motion.div>
      </div>
    </div>
  );
}
