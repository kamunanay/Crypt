'use client';

import { useQuery } from '@tanstack/react-query';
import { getGoldPrice } from '../../services/gold';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';

export default function EmasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gold'],
    queryFn: getGoldPrice,
    refetchInterval: 30000,
  });
  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold">Emas</h1>
      <p className="text-white/40 mt-1">Gold price · XAU/USD</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CardPremium
          title="XAU/USD"
          subtitle="Gold Spot"
          value={data?.price ? `$${data.price.toLocaleString()}` : '...'}
          change="+0.32%"
          positive
          loading={isLoading}
          color="#f5c842"
          gold
        />
      </div>
      <div className="mt-8"><PriceChart symbol="XAU/USD" /></div>
    </div>
  );
}
