import axios from 'axios';
import { GoldData } from '../types';

export async function getGoldPrice(): Promise<GoldData> {
  try {
    const response = await axios.get('https://api.gold-api.com/price/XAU', {
      timeout: 10000,
    });
    return { price: response.data.price || 2350.00 };
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return { price: 2350.00 };
  }
}
