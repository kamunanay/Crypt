'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../../services/forex';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import Converter from '../../../components/ui/converter';
import CoinDisplay from '../../../components/ui/coin-display';
import { motion } from 'framer-motion';

export default function CurrencyDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const map: Record<string, { pair: string; rate: number; color: string; label: string }> = {
    usd: { pair: 'USD/IDR', rate: data?.usdIdr || 0, color: '#f5c842', label: 'Dollar' },
    eur: { pair: 'EUR/IDR', rate: data?.eurIdr || 0, color: '#4a8fe7', label: 'Euro' },
    gbp: { pair: 'GBP/IDR', rate: data?.gbpIdr || 0, color: '#2d8b7a', label: 'Pound' },
    jpy: { pair: 'JPY/IDR', rate: data?.jpyIdr || 0, color: '#d43f3f', label: 'Yen' },
    aud: { pair: 'AUD/IDR', rate: data?.audIdr || 0, color: '#cc7a3a', label: 'Dollar' },
    chf: { pair: 'CHF/IDR', rate: data?.usdIdr || 0, color: '#bf1e1e', label: 'Franc' },
    cny: { pair: 'CNY/IDR', rate: data?.usdIdr || 0, color: '#c41e3a', label: 'Yuan' },
  };

  const info = map[symbol.toLowerCase()];

  return (
    <div className="min-h-screen bg-gradient-primary pt-[72px] px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                <span className="text-[#0b0d1a] text-lg font-bold font-display">C</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold font-display">
                {symbol.toUpperCase()} / IDR
              </h1>
            </div>
            <p className="text-white/40 text-lg mt-2 font-light">{info?.pair}</p>
          </div>
          <div className="w-[160px] h-[160px]">
            <CoinDisplay symbol={symbol.toUpperCase()} label={info?.label || ''} color={info?.color || '#fff'} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardPremium
            title={info?.pair || ''}
            value={info?.rate ? info.rate.toLocaleString('id-ID') : '...'}
            change="+0.14%"
            positive
            loading={isLoading}
            color={info?.color}
            large
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <PriceChart symbol={`${symbol.toUpperCase()}/IDR`} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Converter defaultFrom={symbol.toUpperCase()} defaultTo="IDR" />
        </motion.div>
      </div>
    </div>
  );
}
