import type { CryptoPrice } from "$type";
import { options } from "../config/crypto";

export async function binanceFetchPrice(selected: string) {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${selected}`,
    );
    const data: CryptoPrice = await response.json();

    if (response.ok) {
      return Number(data.price) as number;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function binanceFetchPrices() {
  const response = await fetch("https://api.binance.com/api/v3/ticker/price");
  const data: CryptoPrice[] = await response.json();
  const coins = options.map((item) => item.value);
  return coins.map((coin) => data.find((item) => item.symbol === coin));
}
