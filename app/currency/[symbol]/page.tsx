import CurrencyDetailClient from './CurrencyDetailClient';

export async function generateStaticParams() {
  return [{ symbol: 'usd' }, { symbol: 'eur' }, { symbol: 'gbp' }, { symbol: 'jpy' }, { symbol: 'idr' }, { symbol: 'aud' }, { symbol: 'chf' }, { symbol: 'cny' }];
}

export default function Page({ params }: { params: any }) {
  return <CurrencyDetailClient symbol={params.symbol} />;
}
