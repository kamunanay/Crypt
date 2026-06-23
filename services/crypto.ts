import axios from 'axios';

export async function getCryptoPrices() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,bnb&vs_currencies=usd&include_24hr_change=true'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {
      bitcoin: { usd: 67812.45, usd_24h_change: 2.35 },
      ethereum: { usd: 3456.78, usd_24h_change: 1.23 },
      solana: { usd: 187.65, usd_24h_change: -0.45 },
      ripple: { usd: 0.6123, usd_24h_change: 0.78 },
      bnb: { usd: 598.72, usd_24h_change: 1.56 },
    };
  }
}
