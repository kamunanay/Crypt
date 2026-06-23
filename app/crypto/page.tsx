'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '@/services/crypto';
import CardPremium from '@/components/ui/card-premium';
import PriceChart from '@/components/charts/price-chart';

export default function CryptoPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const cryptos = [
    { id: 'bitcoin', symbol: 'BTC', color: '#f7931a' },
    { id: 'ethereum', symbol: 'ETH', color: '#627eea' },
    { id: 'solana', symbol: 'SOL', color: '#9945ff' },
    { id: 'ripple', symbol: 'XRP', color: '#00aae4' },
    { id: 'bnb', symbol: 'BNB', color: '#f3ba2f' },
  ];

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold">Crypto</h1>
      <p className="text-white/40 mt-1">Digital assets · Live prices</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cryptos.map((crypto) => {
          const price = data?.[crypto.id]?.usd;
          const change = data?.[crypto.id]?.usd_24h_change;
          return (
            <CardPremium
              key={crypto.symbol}
              title={crypto.symbol}
              subtitle={crypto.id}
              value={price ? `$${price.toLocaleString()}` : '...'}
              change={change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '...'}
              positive={change ? change >= 0 : true}
              loading={isLoading}
              color={crypto.color}
            />
          );
        })}
      </div>

      <div className="mt-8">
        <PriceChart symbol="BTC/USD" />
      </div>
    </div>
  );
}
