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
  purchaseDate: Date; // ISO date string
}

export const createTransaction = async ({
  access_token,
  symbol,
  amount,
  price,
  note,
  direction,
  purchaseDate,
}: CreateTransactionParams) => {
  const response = await client.transcations.post(
    {
      symbol,
      amount,
      price,
      note,
      direction,
      purchaseDate,
    },
    {
      ...options(access_token),
    },
  );
  if (response.status !== 200) {
    throw new Error("Transaction creation failed");
  }
  return response.data;
};

interface Transaction {
  id: string;
  purchaseDate: Date;
  direction: "BUY" | "SELL";
  userId: string;
  symbol: string;
  amount: number;
  price: number;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getTransaction = async (access_token: string, id: string) => {
  const response = await client
    .transcations({
      id,
    })
    .get(options(access_token));

  if (response.status !== 200) {
    throw new Error("Transaction get failed");
  }
  return response.data as { data: Transaction };
};

export interface GetTransactionsParams extends BasePrams {
  page?: number;
  limit?: number;
  direction?: Direction;
  symbol: string;
  from?: string;
  to?: string;
}

export const getTransactions = async ({
  access_token,
  page = 1,
  limit = 10,
  symbol,
  from,
  direction,
  to,
}: GetTransactionsParams) => {
  const response = await client.transcations.get({
    query: {
      page,
      limit,
      symbol,
      direction,
      from,
      to,
    },
    ...options(access_token),
  });
  return response.data;
};

export interface UpdateTransactionParams extends CreateTransactionParams {
  id: string;
}

export const updateTransaction = async ({
  access_token,
  symbol,
  amount,
  price,
  note,
  direction,
  purchaseDate,
  id,
}: UpdateTransactionParams) => {
  const response = await client
    .transcations({
      id,
    })
    .put(
      {
        symbol,
        amount,
        price,
        note,
        direction,
        purchaseDate,
      },
      {
        ...options(access_token),
      },
    );
  if (response.status !== 200) {
    throw new Error("Transaction update failed");
  }
  return response.data;
};

export const deleteTransaction = async ({
  id,
  access_token,
}: {
  id: string;
  access_token: string;
}) => {
  const response = await client
    .transcations({
      id,
    })
    .delete(
      {},
      {
        ...options(access_token),
      },
    );
  if (response.status !== 200) {
    throw new Error("Transaction delete failed");
  }
  return response.data;
};
