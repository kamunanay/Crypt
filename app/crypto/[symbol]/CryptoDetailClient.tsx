'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../../../services/crypto';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';

export default function CryptoDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const cryptoMap: Record<string, { id: string; color: string }> = {
    btc: { id: 'bitcoin', color: '#f7931a' },
    eth: { id: 'ethereum', color: '#627eea' },
    sol: { id: 'solana', color: '#9945ff' },
    xrp: { id: 'ripple', color: '#00aae4' },
    bnb: { id: 'bnb', color: '#f3ba2f' },
  };

  const info = cryptoMap[symbol.toLowerCase()];
  const priceData = info ? data?.[info.id] : null;

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{ background: `${info?.color}20`, color: info?.color }}
        >
          {symbol.toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {symbol.toUpperCase()} / USD
          </h1>
          <p className="text-white/40">{info?.id}</p>
        </div>
      </div>

      <div className="mt-6">
        <CardPremium
          title={`${symbol.toUpperCase()}/USD`}
          value={priceData?.usd ? `$${priceData.usd.toLocaleString()}` : '...'}
          change={
            priceData?.usd_24h_change
              ? `${priceData.usd_24h_change >= 0 ? '+' : ''}${priceData.usd_24h_change.toFixed(2)}%`
              : '...'
          }
          positive={priceData?.usd_24h_change ? priceData.usd_24h_change >= 0 : true}
          loading={isLoading}
          color={info?.color}
        />
      </div>

      <div className="mt-8">
        <PriceChart symbol={`${symbol.toUpperCase()}/USD`} />
      </div>
    </div>
  );
}
