'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const GalaxySceneContent = dynamic(() => import('./galaxy-scene-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#070912]">
      <div className="text-[#f5c842] text-lg animate-pulse">Loading Financial Galaxy...</div>
    </div>
  ),
});

interface GalaxySceneProps {
  onAssetClick?: (symbol: string, type: 'forex' | 'crypto' | 'gold') => void;
}

export default function GalaxyScene({ onAssetClick }: GalaxySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center bg-[#070912]"><div className="text-[#f5c842] text-lg">Loading Financial Galaxy...</div></div>;
  }
  return <div ref={containerRef} className="w-full h-full"><GalaxySceneContent onAssetClick={onAssetClick} /></div>;
}
