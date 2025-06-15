import type { CryptoPrice } from "$type";

export async function binanceFetchSinglePrice(selected: string) {
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

export async function binanceFetchMultiPrice(selected: string[]) {
  try {
    const jsonSymbols = JSON.stringify(selected);
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbols=${encodeURIComponent(jsonSymbols)}`,
    );
    const data: CryptoPrice[] = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (err) {
    throw Error(err.message);
  }
}
