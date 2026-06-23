import axios from 'axios';

export async function getGoldPrice() {
  try {
    const response = await axios.get('https://api.gold-api.com/price/XAU');
    return {
      price: response.data.price || 2350.00,
    };
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return { price: 2350.00 };
  }
}
