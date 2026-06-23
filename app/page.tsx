'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const GalaxyScene = dynamic(() => import('@/components/three/galaxy-scene'), {
  ssr: false,
});

export default function HomePage() {
  const router = useRouter();

  const handleAssetClick = (symbol: string, type: 'forex' | 'crypto' | 'gold') => {
    if (type === 'forex') {
      router.push(`/currency/${symbol}`);
    } else if (type === 'crypto') {
      router.push(`/crypto/${symbol}`);
    } else if (type === 'gold') {
      router.push('/emas');
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#070912]">
      <GalaxyScene onAssetClick={handleAssetClick} />
      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          World Financial Galaxy
        </h1>
        <p className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mt-2">
          Forex · Crypto · Gold
        </p>
      </div>
    </div>
  );
}
