export interface TransactionType {
  symbol: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  price: number;
  purchaseDate: Date;
  direction: "BUY" | "SELL";
  userId: string;
}
