'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../services/crypto';
import CardPremium from '../components/ui/card-premium';
import PriceChart from '../components/charts/price-chart';
import { motion } from 'framer-motion';

const cryptoIcons: Record<string, string> = {
  BTC: '₿',
  ETH: '⟠',
  SOL: '◎',
  XRP: '✕',
  BNB: '◆',
};

export default function CryptoPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const cryptos = [
    { id: 'bitcoin', symbol: 'BTC', color: '#f7931a', label: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', color: '#627eea', label: 'Ethereum' },
    { id: 'solana', symbol: 'SOL', color: '#9945ff', label: 'Solana' },
    { id: 'ripple', symbol: 'XRP', color: '#00aae4', label: 'XRP' },
    { id: 'bnb', symbol: 'BNB', color: '#f3ba2f', label: 'BNB' },
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
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">Cryptocurrency</h1>
          <p className="text-white/40 text-sm mt-1">Digital assets · {timestamp} WIB</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cryptos.map((crypto, i) => {
            const price = data?.[crypto.id]?.usd;
            const change = data?.[crypto.id]?.usd_24h_change;
            return (
              <motion.div key={crypto.symbol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <CardPremium
                  title={crypto.symbol}
                  subtitle={crypto.label}
                  value={price ? `$${price.toLocaleString()}` : '...'}
                  change={change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '...'}
                  positive={change ? change >= 0 : true}
                  loading={isLoading}
                  color={crypto.color}
                  icon={cryptoIcons[crypto.symbol] || '🪙'}
                />
              </motion.div>
            );
          })}
        </div>

        <PriceChart symbol="BTC/USD" />
      </div>
    </div>
  );
}
