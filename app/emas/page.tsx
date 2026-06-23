'use client';

import { useQuery } from '@tanstack/react-query';
import { getGoldPrice } from '../../services/gold';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import CoinDisplay from '../../components/ui/coin-display';

export default function EmasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gold'],
    queryFn: getGoldPrice,
    refetchInterval: 30000,
  });

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto bg-gradient-dark min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">Emas</h1>
          <p className="text-white/40 mt-1 text-lg">Gold price · XAU/USD</p>
        </div>
        <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <CoinDisplay symbol="Au" label="Gold" color="#f5c842" isGold />
        </div>
      </div>

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
        <div className="flex items-center justify-center">
          <div className="w-[250px] h-[250px]">
            <CoinDisplay symbol="Au" label="Gold" color="#f5c842" isGold />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <PriceChart symbol="XAU/USD" />
      </div>
    </div>
  );
}
