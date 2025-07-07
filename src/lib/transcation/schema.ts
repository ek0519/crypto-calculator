import { z } from "zod";

export const formSchema = z.object({
  purchaseDate: z.any(),
  direction: z.enum(["BUY", "SELL"]),
  symbol: z.string().min(1).max(10),
  amount: z.number().min(0.0000001, "Amount must be greater than 0"),
  price: z.number().min(0.0000001, "Price must be greater than 0"),
  note: z.string().optional(),
});

export type FormSchema = typeof formSchema;
