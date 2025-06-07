//api.kraken.com/0/public/Ticker?pair=CROUSD

import type { KrakenResponse } from "$type";

export async function krakenFetchPrice(selected: string) {
  try {
    const response = await fetch(
      `https://api.kraken.com/0/public/Ticker?pair=${selected}`,
    );
    const data: KrakenResponse = await response.json();

    if (response.ok) {
      return Number(data.result[selected].a[0]) as number;
    }
  } catch (err) {
    throw Error(err.message);
  }
}
