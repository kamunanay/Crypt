'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '@/services/forex';
import CardPremium from '@/components/ui/card-premium';
import PriceChart from '@/components/charts/price-chart';
import Converter from '@/components/ui/converter';

export default function CurrencyDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;

  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const pairMap: Record<string, { pair: string; rate: number }> = {
    usd: { pair: 'USD/IDR', rate: data?.usdIdr || 0 },
    eur: { pair: 'EUR/IDR', rate: data?.eurIdr || 0 },
    gbp: { pair: 'GBP/IDR', rate: data?.gbpIdr || 0 },
    jpy: { pair: 'JPY/IDR', rate: data?.jpyIdr || 0 },
    aud: { pair: 'AUD/IDR', rate: data?.audIdr || 0 },
    chf: { pair: 'CHF/IDR', rate: data?.usdIdr || 0 },
    cny: { pair: 'CNY/IDR', rate: data?.usdIdr || 0 },
  };

  const info = pairMap[symbol.toLowerCase()];

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#f5c842]/20 flex items-center justify-center text-2xl font-bold text-[#f5c842]">
          {symbol.toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {symbol.toUpperCase()} / IDR
          </h1>
          <p className="text-white/40">{info?.pair}</p>
        </div>
      </div>

      <div className="mt-6">
        <CardPremium
          title={info?.pair || ''}
          value={info?.rate ? info.rate.toLocaleString('id-ID') : '...'}
          change="+0.14%"
          positive
          loading={isLoading}
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
