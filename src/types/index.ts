export type Option = {
  label: string;
  value: string | number | null;
};

export type CryptoPrice = {
  symbol: string;
  price: string;
  message?: string;
  error?: string;
};

interface MarketData {
  // 問價 (Ask): [價格, 數量, 總量]
  a: [string, string, string];
  // 投標價 (Bid): [價格, 數量, 總量]
  b: [string, string, string];
  // 最新成交價: [價格, 數量]
  c: [string, string];
  // 交易量: [當前交易量, 總交易量]
  v: [string, string];
  // 成交均價: [當前均價, 總均價]
  p: [string, string];
  // 交易次數: [當前交易數, 總交易數]
  t: [number, number];
  // 最低價: [當前最低價, 總最低價]
  l: [string, string];
  // 最高價: [當前最高價, 總最高價]
  h: [string, string];
  // 開盤價
  o: string;
}

export interface KrakenResponse {
  result: {
    [pair: string]: MarketData;
  };
}
