export interface ForexData {
  usdIdr: number;
  eurIdr: number;
  gbpIdr: number;
  jpyIdr: number;
  audIdr: number;
}

export interface CryptoData {
  [key: string]: { usd: number; usd_24h_change: number };
}

export interface GoldData { price: number; }
