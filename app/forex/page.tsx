'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../services/forex';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import Converter from '../../components/ui/converter';

export default function ForexPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });
  const pairs = [
    { from: 'USD', to: 'IDR', rate: data?.usdIdr },
    { from: 'EUR', to: 'IDR', rate: data?.eurIdr },
    { from: 'GBP', to: 'IDR', rate: data?.gbpIdr },
    { from: 'JPY', to: 'IDR', rate: data?.jpyIdr },
    { from: 'AUD', to: 'IDR', rate: data?.audIdr },
  ];
  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold">Forex</h1>
      <p className="text-white/40 mt-1">Major currency pairs · Real-time rates</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {pairs.map((pair) => (
          <CardPremium
            key={`${pair.from}-${pair.to}`}
            title={`${pair.from}/${pair.to}`}
            value={pair.rate ? pair.rate.toLocaleString('id-ID') : '...'}
            change="+0.14%"
            positive
            loading={isLoading}
          />
        ))}
      </div>
      <div className="mt-8"><PriceChart symbol="USD/IDR" /></div>
      <div className="mt-8"><Converter /></div>
    </div>
  );
}
