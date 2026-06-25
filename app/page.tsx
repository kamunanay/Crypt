'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../services/forex';
import { getCryptoPrices } from '../services/crypto';
import { getGoldPrice } from '../services/gold';
import CardPremium from '../components/ui/card-premium';
import Converter from '../components/ui/converter';
import PriceChart from '../components/charts/price-chart';
import { motion } from 'framer-motion';

const cryptoIcons: Record<string, string> = {
  BTC: '₿',
  ETH: '⟠',
  SOL: '◎',
  XRP: '✕',
  BNB: '◆',
};

export default function HomePage() {
  const { data: forexData, isLoading: forexLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const { data: cryptoData, isLoading: cryptoLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const { data: goldData, isLoading: goldLoading } = useQuery({
    queryKey: ['gold'],
    queryFn: getGoldPrice,
    refetchInterval: 30000,
  });

  const pairs = [
    { from: 'USD', to: 'IDR', rate: forexData?.usdIdr, color: '#f5c842', label: 'US Dollar / Indonesian Rupiah' },
    { from: 'EUR', to: 'IDR', rate: forexData?.eurIdr, color: '#4a8fe7', label: 'Euro / Indonesian Rupiah' },
    { from: 'GBP', to: 'IDR', rate: forexData?.gbpIdr, color: '#2d8b7a', label: 'British Pound / Indonesian Rupiah' },
    { from: 'JPY', to: 'IDR', rate: forexData?.jpyIdr, color: '#d43f3f', label: 'Japanese Yen / Indonesian Rupiah' },
    { from: 'AUD', to: 'IDR', rate: forexData?.audIdr, color: '#cc7a3a', label: 'Australian Dollar / Indonesian Rupiah' },
  ];

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
          <div className="flex items-center gap-2 text-gold text-xs font-medium tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Market Overview
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
            Financial Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Data diperbarui secara real-time • {timestamp} WIB
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {pairs.map((pair, i) => (
            <motion.div key={pair.from} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CardPremium
                title={`${pair.from}/${pair.to}`}
                subtitle={pair.label}
                value={pair.rate ? pair.rate.toLocaleString('id-ID') : '...'}
                change="+0.42%"
                positive
                loading={forexLoading}
                color={pair.color}
                onClick={() => window.location.href = `/currency/${pair.from.toLowerCase()}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <PriceChart symbol="USD/IDR" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Converter />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <h2 className="text-2xl font-bold text-white font-display mb-4">Cryptocurrency</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cryptos.map((crypto, i) => {
              const price = cryptoData?.[crypto.id]?.usd;
              const change = cryptoData?.[crypto.id]?.usd_24h_change;
              return (
                <motion.div key={crypto.symbol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.5 }}>
                  <CardPremium
                    title={crypto.symbol}
                    subtitle={crypto.label}
                    value={price ? `$${price.toLocaleString()}` : '...'}
                    change={change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '...'}
                    positive={change ? change >= 0 : true}
                    loading={cryptoLoading}
                    color={crypto.color}
                    icon={cryptoIcons[crypto.symbol] || '🪙'}
                    onClick={() => window.location.href = `/crypto/${crypto.symbol.toLowerCase()}`}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-bold text-white font-display mb-4">Emas (XAU/USD)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardPremium
              title="XAU/USD"
              subtitle="Gold Spot"
              value={goldData?.price ? `$${goldData.price.toLocaleString()}` : '...'}
              change="+0.55%"
              positive
              loading={goldLoading}
              color="#f5c842"
              gold
              onClick={() => window.location.href = '/emas'}
            />
            <div className="glass rounded-2xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🏆</div>
                <div className="text-gold text-2xl font-bold">
                  {goldData?.price ? `$${goldData.price.toLocaleString()}` : '...'}
                </div>
                <div className="text-green-400 text-sm mt-1">+0.55% hari ini</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-white/20 text-xs font-light tracking-wider">
          Data diperbarui secara real-time • {timestamp} WIB
        </div>
      </div>
    </div>
  );
}
