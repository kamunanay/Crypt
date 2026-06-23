'use client';

import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../services/forex';
import CardPremium from '../../components/ui/card-premium';
import PriceChart from '../../components/charts/price-chart';
import Converter from '../../components/ui/converter';
import CoinDisplay from '../../components/ui/coin-display';

export default function ForexPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const pairs = [
    { from: 'USD', to: 'IDR', rate: data?.usdIdr, color: '#f5c842' },
    { from: 'EUR', to: 'IDR', rate: data?.eurIdr, color: '#4a8fe7' },
    { from: 'GBP', to: 'IDR', rate: data?.gbpIdr, color: '#2d8b7a' },
    { from: 'JPY', to: 'IDR', rate: data?.jpyIdr, color: '#d43f3f' },
    { from: 'AUD', to: 'IDR', rate: data?.audIdr, color: '#cc7a3a' },
  ];

  return (
    <div className="pt-[88px] px-4 md:px-8 pb-12 max-w-7xl mx-auto bg-gradient-dark min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">Forex</h1>
          <p className="text-white/40 mt-1 text-lg">Major currency pairs · Real-time rates</p>
        </div>
        <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
          <CoinDisplay symbol="USD" label="Dollar" color="#f5c842" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {pairs.map((pair) => (
          <CardPremium
            key={`${pair.from}-${pair.to}`}
            title={`${pair.from}/${pair.to}`}
            value={pair.rate ? pair.rate.toLocaleString('id-ID') : '...'}
            change="+0.14%"
            positive
            loading={isLoading}
            color={pair.color}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PriceChart symbol="USD/IDR" />
        <div className="flex items-center justify-center">
          <div className="w-[280px] h-[280px]">
            <CoinDisplay symbol="IDR" label="Rupiah" color="#8b6b4d" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Converter />
      </div>
    </div>
  );
}
