import { transformLabelToPair } from "$lib/utils";

export interface RealTimePrice {
  symbol: string;
  price: string;
}

export interface CoinDistribution {
  symbol: string;
  amountCount: number;
  totalValue: number;
}

export interface ComputedRealTimeTotalPriceProps {
  realTimePrices: RealTimePrice[];
  coinDistribution: CoinDistribution[];
}

export const computedRealTimeTotalPrice = ({
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

export interface HoldingsProps extends ComputedRealTimeTotalPriceProps {
  realTimeTotalPrice: number;
}

export interface Holdings {
  symbol: string;
  amountCount: number;
  totalValue: number;
  percentage: string;
}

export const holdings = ({
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
