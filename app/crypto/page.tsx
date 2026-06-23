'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../../services/crypto';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import CoinDisplay from '../../components/ui/coin-display';

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
    { id: 'ripple', symbol: 'XRP', color: '#00aae4', label: 'Ripple' },
    { id: 'bnb', symbol: 'BNB', color: '#f3ba2f', label: 'BNB' },
  ];

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto bg-gradient-dark min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">Crypto</h1>
          <p className="text-white/40 mt-1 text-lg">Digital assets · Live prices</p>
        </div>
        <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <CoinDisplay symbol="BTC" label="Bitcoin" color="#f7931a" isCrypto />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cryptos.map((crypto) => {
          const price = data?.[crypto.id]?.usd;
          const change = data?.[crypto.id]?.usd_24h_change;
          return (
            <CardPremium
              key={crypto.symbol}
              title={crypto.symbol}
              subtitle={crypto.label}
              value={price ? `$${price.toLocaleString()}` : '...'}
              change={change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '...'}
              positive={change ? change >= 0 : true}
              loading={isLoading}
              color={crypto.color}
            />
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PriceChart symbol="BTC/USD" />
        <div className="flex items-center justify-center">
          <div className="w-[280px] h-[280px]">
            <CoinDisplay symbol="ETH" label="Ethereum" color="#627eea" isCrypto />
          </div>
        </div>
      </div>
    </div>
  );
}
