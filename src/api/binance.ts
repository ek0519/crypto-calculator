import type { CryptoPrice } from "$type";

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
    throw Error(err.message);
  }
}
