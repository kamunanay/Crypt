'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../../services/forex';
import CardPremium from '../../../components/ui/card-premium';
import PriceChart from '../../../components/charts/price-chart';
import Converter from '../../../components/ui/converter';
import CoinDisplay from '../../../components/ui/coin-display';

export default function CurrencyDetailClient({ symbol }: { symbol: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const pairMap: Record<string, { pair: string; rate: number; color: string; label: string }> = {
    usd: { pair: 'USD/IDR', rate: data?.usdIdr || 0, color: '#f5c842', label: 'Dollar' },
    eur: { pair: 'EUR/IDR', rate: data?.eurIdr || 0, color: '#4a8fe7', label: 'Euro' },
    gbp: { pair: 'GBP/IDR', rate: data?.gbpIdr || 0, color: '#2d8b7a', label: 'Pound' },
    jpy: { pair: 'JPY/IDR', rate: data?.jpyIdr || 0, color: '#d43f3f', label: 'Yen' },
    aud: { pair: 'AUD/IDR', rate: data?.audIdr || 0, color: '#cc7a3a', label: 'Dollar' },
    chf: { pair: 'CHF/IDR', rate: data?.usdIdr || 0, color: '#bf1e1e', label: 'Franc' },
    cny: { pair: 'CNY/IDR', rate: data?.usdIdr || 0, color: '#c41e3a', label: 'Yuan' },
  };

  const info = pairMap[symbol.toLowerCase()];

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto bg-gradient-dark min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">
            {symbol.toUpperCase()} / IDR
          </h1>
          <p className="text-white/40 mt-1 text-lg">{info?.pair}</p>
        </div>
        <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <CoinDisplay 
            symbol={symbol.toUpperCase()} 
            label={info?.label || ''} 
            color={info?.color || '#ffffff'} 
          />
        </div>
      </div>

      <div className="mt-6">
        <CardPremium
          title={info?.pair || ''}
          value={info?.rate ? info.rate.toLocaleString('id-ID') : '...'}
          change="+0.14%"
          positive
          loading={isLoading}
          color={info?.color}
          large
        />
      </div>

      <div className="mt-8">
        <PriceChart symbol={`${symbol.toUpperCase()}/IDR`} />
      </div>

      <div className="mt-8">
        <Converter defaultFrom={symbol.toUpperCase()} defaultTo="IDR" />
      </div>
    </div>
  );
}
