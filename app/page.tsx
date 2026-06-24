'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import MarketGrid from '../components/ui/market-grid';

const GalaxyScene = dynamic(() => import('../components/three/galaxy-scene'), { ssr: false });

export default function HomePage() {
  const router = useRouter();

  const handleAssetClick = (symbol: string, type: 'forex' | 'crypto' | 'gold') => {
    if (type === 'forex') router.push(`/currency/${symbol}`);
    else if (type === 'crypto') router.push(`/crypto/${symbol}`);
    else if (type === 'gold') router.push('/emas');
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section — Full Screen */}
      <div className="relative w-screen h-screen overflow-hidden">
        <GalaxyScene onAssetClick={handleAssetClick} />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0d1a]/90 pointer-events-none" />
        
        {/* Logo C di atas */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold/20">
              <span className="text-[#0b0d1a] text-2xl font-bold font-display">C</span>
            </div>
            <span className="text-2xl font-bold text-gold font-display tracking-tight">
              CUKIMAI
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent font-display tracking-tight"
          >
            Cek Harga Mata Uang, Crypto, Dan Lain Lain
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-sm md:text-base tracking-[0.2em] uppercase mt-3 font-light"
          >
            Real-Time Market Data
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <p className="text-white/10 text-xs tracking-[0.2em] font-light animate-pulse">
            Scroll untuk eksplor
          </p>
        </div>
      </div>

      {/* Market Data Grid — Seperti Gambar Referensi */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Real-Time Market Data
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
            Data akurat, update real-time dari pasar global.
          </h2>
        </motion.div>

        <MarketGrid />
      </div>
    </div>
  );
}
