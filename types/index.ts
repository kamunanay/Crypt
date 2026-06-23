export interface ForexData {
  usdIdr: number;
  eurIdr: number;
  gbpIdr: number;
  jpyIdr: number;
  audIdr: number;
}

export interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}

export interface CryptoData {
  [key: string]: CryptoPrice;
}

export interface GoldData {
  price: number;
}
