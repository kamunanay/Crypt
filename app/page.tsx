'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const GalaxyScene = dynamic(() => import('../components/three/galaxy-scene'), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const handleAssetClick = (symbol: string, type: 'forex' | 'crypto' | 'gold') => {
    if (type === 'forex') router.push(`/currency/${symbol}`);
    else if (type === 'crypto') router.push(`/crypto/${symbol}`);
    else if (type === 'gold') router.push('/emas');
  };
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#070912] relative">
      <GalaxyScene onAssetClick={handleAssetClick} />
      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(245,200,66,0.15)]">
          World Financial Galaxy
        </h1>
        <p className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mt-3 font-light">
          Forex · Crypto · Gold
        </p>
        <div className="mt-4 flex justify-center gap-6 text-white/20 text-xs tracking-[0.2em]">
          <span>✦ Drag to explore</span>
          <span>✦ Click any asset</span>
        </div>
      </div>
    </div>
  );
}
