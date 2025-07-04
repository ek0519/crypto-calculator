import { env } from "$env/dynamic/public";
import { treaty } from "@elysiajs/eden";

import type { App } from "../../../crypto-backend/src/app";

const client = treaty<App>(env.PUBLIC_API_URL);

const options = (access_token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

interface BasePrams {
  access_token: string;
}

export const dashboard = async (access_token: string) => {
  const response = await client.dashboard.get(options(access_token));
  return response.data;
};

export const login = async (email: string) => {
  const response = await client.auth.login.post({
    email,
  });
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  return response.data;
};

export enum Direction {
  BUY = "BUY",
  SELL = "SELL",
}

export interface CreateTransactionParams extends BasePrams {
  symbol: string;
  amount: number;
  price: number;
  note?: string;
  direction: "BUY" | "SELL";
}

export const createTransaction = async ({
  access_token,
  symbol,
  amount,
  price,
  note,
  direction,
}: CreateTransactionParams) => {
  const response = await client.transcations.post({
    symbol,
    amount,
    price,
    note,
    direction,
    ...options(access_token),
  });
  if (response.status !== 200) {
    throw new Error("Transaction creation failed");
  }
  return response.data;
};

export const getTransaction = async (access_token: string, id: string) => {
  const response = await client["transcations:id"].get({
    query: {
      id,
    },
  });
  if (response.status !== 200) {
    throw new Error("Transaction get failed");
  }
  return response.data;
};

export interface GetTransactionsParams extends BasePrams {
  page?: number;
  limit?: number;
  symbol: string;
  from?: Date;
  to?: Date;
}

export const getTransactions = async ({
  access_token,
  page = 1,
  limit = 10,
  symbol,
  from,
  to,
}: GetTransactionsParams) => {
  const response = await client.transcations.get({
    query: {
      page,
      limit,
      symbol,
      from,
      to,
    },
    ...options(access_token),
  });
};
