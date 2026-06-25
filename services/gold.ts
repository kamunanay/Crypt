import axios from 'axios';
import { GoldData } from '../types';

export async function getGoldPrice(): Promise<GoldData> {
  try {
    const res = await axios.get('https://api.gold-api.com/price/XAU');
    return { price: res.data.price || 2350.00 };
  } catch {
    return { price: 2350.00 };
  }
}
