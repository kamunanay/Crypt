import axios from 'axios';
import { ForexData } from '../types';

export async function getForexRates(): Promise<ForexData> {
  try {
    // Free API tanpa key — exchangerate-api.com
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD', {
      timeout: 10000,
    });
    
    if (response.status !== 200 || !response.data?.rates) {
      return getFallbackData();
    }

    const rates = response.data.rates;
    const usdIdr = rates.IDR || 16322.45;
    const eurRate = rates.EUR || 1;
    const gbpRate = rates.GBP || 1;
    const jpyRate = rates.JPY || 1;
    const audRate = rates.AUD || 1;

    return {
      usdIdr: usdIdr,
      eurIdr: usdIdr / eurRate,
      gbpIdr: usdIdr / gbpRate,
      jpyIdr: usdIdr / jpyRate,
      audIdr: usdIdr / audRate,
    };
  } catch (error) {
    console.error('Error fetching forex rates:', error);
    return getFallbackData();
  }
}

function getFallbackData(): ForexData {
  return { 
    usdIdr: 16322.45, 
    eurIdr: 17603.21, 
    gbpIdr: 20651.32, 
    jpyIdr: 104.52, 
    audIdr: 10656.21 
  };
}

export async function getCurrencyRate(from: string, to: string): Promise<number> {
  const rates = await getForexRates();
  const rateMap: Record<string, number> = {
    USD: 1,
    IDR: 1 / rates.usdIdr,
    EUR: 1 / rates.eurIdr,
    GBP: 1 / rates.gbpIdr,
    JPY: 1 / rates.jpyIdr,
    AUD: 1 / rates.audIdr,
    CHF: 1 / 16500,
    CNY: 1 / 2250,
  };
  const fromRate = rateMap[from] || 1;
  const toRate = rateMap[to] || 1;
  return fromRate / toRate;
}
