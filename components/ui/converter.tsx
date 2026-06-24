'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getForexRates } from '../../services/forex';

const currencies = ['USD', 'IDR', 'EUR', 'GBP', 'JPY', 'AUD', 'CHF', 'CNY'];

export default function Converter() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('IDR');
  const [amount, setAmount] = useState<number | string>(1);
  const [result, setResult] = useState<number>(0);
  const { data, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexRates,
    refetchInterval: 30000,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) setAmount(val);
  };

  useEffect(() => {
    if (data && amount !== '' && !isNaN(Number(amount))) {
      const rates: Record<string, number> = {
        USD: 1,
        IDR: 1 / data.usdIdr,
        EUR: 1 / data.eurIdr,
        GBP: 1 / data.gbpIdr,
        JPY: 1 / data.jpyIdr,
        AUD: 1 / data.audIdr,
        CHF: 1 / 16500,
        CNY: 1 / 2250,
      };
      const fromRate = rates[from] || 1;
      const toRate = rates[to] || 1;
      setResult((Number(amount) * fromRate) / toRate);
    }
  }, [amount, from, to, data]);

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gold">Konverter Mata Uang</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/40 block mb-1">Dari</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50"
          >
            {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/40 block mb-1">Jumlah</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Masukkan angka"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="text-sm text-white/40 block mb-1">Ke</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50"
          >
            {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4 text-center">
        {isLoading ? (
          <div className="animate-pulse text-white/30">Memuat data...</div>
        ) : (
          <>
            <p className="text-3xl font-bold text-gold">
              {!isNaN(result) ? result.toFixed(2) : '0.00'} {to}
            </p>
            <p className="text-sm text-white/30 mt-1">
              1 {from} = {amount && !isNaN(Number(amount)) ? (result / Number(amount)).toFixed(6) : '0.000000'} {to}
            </p>
            <p className="text-xs text-white/20 mt-2">
              Kurs saat ini: 1 {from} = {result && amount ? (result / Number(amount)).toFixed(6) : '0.000000'} {to}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
