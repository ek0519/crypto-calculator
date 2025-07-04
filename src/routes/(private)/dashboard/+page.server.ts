import type { CryptoPrice } from "$type";
import { transformLabelToPair } from "@/utils";
import { dashboard } from "../../../api/backend";
import { binanceFetchPrices } from "../../../api/binance";
import { krakenFetchPrice } from "../../../api/kraken";

interface RealTimePrice {
  symbol: string;
  price: string;
}

interface CoinDistribution {
  symbol: string;
  amountCount: number;
  totalValue: number;
}

interface ComputedRealTimeTotalPriceProps {
  realTimePrices: RealTimePrice[];
  coinDistribution: CoinDistribution[];
}

const computedRealTimeTotalPrice = ({
  realTimePrices,
  coinDistribution,
}: ComputedRealTimeTotalPriceProps) => {
  return coinDistribution.reduce((acc, curr) => {
    const price = realTimePrices.find((item) => {
      return transformLabelToPair(curr.symbol) === item.symbol;
    })?.price;
    if (price) {
      return acc + curr.amountCount * Number(price);
    }
    return acc;
  }, 0);
};

interface HoldingsProps extends ComputedRealTimeTotalPriceProps {
  realTimeTotalPrice: number;
}

const holdings = ({
  realTimePrices,
  coinDistribution,
  realTimeTotalPrice,
}: HoldingsProps) => {
  return coinDistribution.map((coin) => {
    const price = realTimePrices.find((item) => {
      return transformLabelToPair(coin.symbol) === item.symbol;
    })?.price;
    const totalValue = price ? Number(price) * coin.amountCount : 0;
    return {
      symbol: coin.symbol,
      amountCount: coin.amountCount,
      totalValue,
      percentage: (totalValue / realTimeTotalPrice).toFixed(2),
    };
  });
};

export const load = async ({ locals, cookies }) => {
  const access_token = cookies.get("access_token") ?? "";
  const [response, prices, croPrice] = await Promise.all([
    dashboard(access_token),
    binanceFetchPrices(),
    krakenFetchPrice("CROUSD"),
  ]);
  const realTimePrices = [
    ...prices,
    { symbol: "CROUSD", price: croPrice },
  ] as CryptoPrice[];
  if (response) {
    const { latestTransactions, portfolioTotal, coinDistribution } = response;
    const realTimeTotalPrice = computedRealTimeTotalPrice({
      realTimePrices,
      coinDistribution,
    });
    return {
      latestTransactions: latestTransactions ?? [],
      portfolioTotal: portfolioTotal.toFixed(4),
      realTimeTotalPrice: realTimeTotalPrice.toFixed(4),
      holdings: holdings({
        realTimePrices,
        coinDistribution,
        realTimeTotalPrice,
      }),
    };
  }
};
