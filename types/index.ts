export interface ForexData {
  usdIdr: number;
  eurIdr: number;
  gbpIdr: number;
  jpyIdr: number;
  audIdr: number;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

export interface GoldPrice {
  price: number;
  change: number;
  changePercent: number;
}
