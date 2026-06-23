import axios from 'axios';
import { ForexData } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_CURRENCY_FREAKS_API_KEY || '';

export async function getForexRates(): Promise<ForexData> {
  if (!API_KEY || API_KEY === '') {
    console.warn('Currency Freaks API key not found. Using fallback data.');
    return getFallbackData();
  }

  try {
    const response = await axios.get(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`
    );

    if (response.status !== 200 || !response.data?.rates) {
      return getFallbackData();
    }

    const rates = response.data.rates;
    const usdIdr = parseFloat(rates.IDR) || 16322.45;
    const eurRate = parseFloat(rates.EUR) || 1;
    const gbpRate = parseFloat(rates.GBP) || 1;
    const jpyRate = parseFloat(rates.JPY) || 1;
    const audRate = parseFloat(rates.AUD) || 1;

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
    audIdr: 10656.21,
  };
}
