'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../../../services/crypto';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import { motion } from 'framer-motion';

const cryptoIcons: Record<string, string> = {
  BTC: '₿',
  ETH: '⟠',
  SOL: '◎',
  XRP: '✕',
  BNB: '◆',
};

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
    xrp: { id: 'ripple', color: '#00aae4', label: 'XRP' },
    bnb: { id: 'bnb', color: '#f3ba2f', label: 'BNB' },
  };

  const info = map[symbol.toLowerCase()];
  const priceData = info ? data?.[info.id] : null;

  return (
    <div className="min-h-screen bg-gradient-primary pt-[88px] px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{cryptoIcons[symbol.toUpperCase()] || '🪙'}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
              {symbol.toUpperCase()} / USD
            </h1>
          </div>
          <p className="text-white/40 text-sm mt-1">{info?.label}</p>
        </motion.div>

        <div className="mb-8">
          <CardPremium
            title={`${symbol.toUpperCase()}/USD`}
            value={priceData?.usd ? `$${priceData.usd.toLocaleString()}` : '...'}
            change={priceData?.usd_24h_change ? `${priceData.usd_24h_change >= 0 ? '+' : ''}${priceData.usd_24h_change.toFixed(2)}%` : '...'}
            positive={priceData?.usd_24h_change ? priceData.usd_24h_change >= 0 : true}
            loading={isLoading}
            color={info?.color}
            icon={cryptoIcons[symbol.toUpperCase()] || '🪙'}
            large
          />
        </div>

        <PriceChart symbol={`${symbol.toUpperCase()}/USD`} />
      </div>
    </div>
  );
}
