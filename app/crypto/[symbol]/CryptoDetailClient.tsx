'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../../../services/crypto';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import CoinDisplay from '../../../components/ui/coin-display';
import { motion } from 'framer-motion';

export default function CryptoDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const map: Record<string, { id: string; color: string; label: string }> = {
    btc: { id: 'bitcoin', color: '#f7931a', label: 'Bitcoin' },
    eth: { id: 'ethereum', color: '#627eea', label: 'Ethereum' },
    sol: { id: 'solana', color: '#9945ff', label: 'Solana' },
    xrp: { id: 'ripple', color: '#00aae4', label: 'Ripple' },
    bnb: { id: 'bnb', color: '#f3ba2f', label: 'BNB' },
  };

  const info = map[symbol.toLowerCase()];
  const priceData = info ? data?.[info.id] : null;

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
                {symbol.toUpperCase()} / USD
              </h1>
            </div>
            <p className="text-white/40 text-lg mt-2 font-light">{info?.label}</p>
          </div>
          <div className="w-[160px] h-[160px]">
            <CoinDisplay symbol={symbol.toUpperCase()} label={info?.label || ''} color={info?.color || '#fff'} isCrypto />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardPremium
            title={`${symbol.toUpperCase()}/USD`}
            value={priceData?.usd ? `$${priceData.usd.toLocaleString()}` : '...'}
            change={priceData?.usd_24h_change ? `${priceData.usd_24h_change >= 0 ? '+' : ''}${priceData.usd_24h_change.toFixed(2)}%` : '...'}
            positive={priceData?.usd_24h_change ? priceData.usd_24h_change >= 0 : true}
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
          <PriceChart symbol={`${symbol.toUpperCase()}/USD`} />
        </motion.div>
      </div>
    </div>
  );
}
