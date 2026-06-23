import CryptoDetailClient from './CryptoDetailClient';

export async function generateStaticParams() {
  return [
    { symbol: 'btc' },
    { symbol: 'eth' },
    { symbol: 'sol' },
    { symbol: 'xrp' },
    { symbol: 'bnb' },
  ];
}

export default function Page({ params }: { params: { symbol: string } }) {
  return <CryptoDetailClient symbol={params.symbol} />;
}
