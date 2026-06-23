'use client';

import { useQuery } from '@tanstack/react-query';
import { getCryptoPrices } from '../../../services/crypto';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import CoinDisplay from '../../../components/ui/coin-display';

export default function CryptoDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['crypto'],
    queryFn: getCryptoPrices,
    refetchInterval: 30000,
  });

  const cryptoMap: Record<string, { id: string; color: string; label: string }> = {
    btc: { id: 'bitcoin', color: '#f7931a', label: 'Bitcoin' },
    eth: { id: 'ethereum', color: '#627eea', label: 'Ethereum' },
    sol: { id: 'solana', color: '#9945ff', label: 'Solana' },
    xrp: { id: 'ripple', color: '#00aae4', label: 'Ripple' },
    bnb: { id: 'bnb', color: '#f3ba2f', label: 'BNB' },
  };

  const info = cryptoMap[symbol.toLowerCase()];
  const priceData = info ? data?.[info.id] : null;

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto bg-gradient-dark min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">
            {symbol.toUpperCase()} / USD
          </h1>
          <p className="text-white/40 mt-1 text-lg">{info?.label}</p>
        </div>
        <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <CoinDisplay 
            symbol={symbol.toUpperCase()} 
            label={info?.label || ''} 
            color={info?.color || '#ffffff'} 
            isCrypto 
          />
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
