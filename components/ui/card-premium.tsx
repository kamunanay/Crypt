'use client';

import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardPremiumProps {
  title: string;
  subtitle?: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  loading?: boolean;
  color?: string;
  gold?: boolean;
  large?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CardPremium({
  title,
  subtitle,
  value,
  change,
  positive = true,
  loading = false,
  color = '#ffffff',
  gold = false,
  large = false,
  className,
  onClick,
}: CardPremiumProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer',
        'glass',
        gold && 'border-gold/20 hover:border-gold/40',
        large && 'p-8',
        className
      )}
    >
      {gold && <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold" style={{ color }}>{title}</h3>
            {subtitle && <p className="text-sm text-white/40">{subtitle}</p>}
          </div>
          {gold && <span className="text-3xl">🏆</span>}
        </div>
        <div className="mt-3">
          {loading ? (
            <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
          ) : (
            <p className={cn('text-3xl font-bold tracking-tight', large && 'text-4xl md:text-5xl')}>
              {value}
            </p>
          )}
        </div>
        {change && (
          <div className="mt-2">
            <span className={cn(
              'text-sm font-medium px-2 py-1 rounded-full',
              positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
            )}>
              {change}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
