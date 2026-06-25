import axios from 'axios';
import { ForexData } from '../types';

export async function getForexRates(): Promise<ForexData> {
  try {
    const res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    if (res.status !== 200 || !res.data?.rates) return getFallback();
    const r = res.data.rates;
    return {
      usdIdr: r.IDR || 16322.45,
      eurIdr: (r.IDR || 16322.45) / (r.EUR || 1),
      gbpIdr: (r.IDR || 16322.45) / (r.GBP || 1),
      jpyIdr: (r.IDR || 16322.45) / (r.JPY || 1),
      audIdr: (r.IDR || 16322.45) / (r.AUD || 1),
    };
  } catch {
    return getFallback();
  }
}

function getFallback(): ForexData {
  return { usdIdr: 16322.45, eurIdr: 17603.21, gbpIdr: 20651.32, jpyIdr: 104.52, audIdr: 10656.21 };
}
