import {
  deleteTransaction,
  getTransaction,
  updateTransaction,
  type UpdateTransactionParams,
} from "$api/backend";
import { isCuid } from "@paralleldrive/cuid2";
import { error, redirect } from "@sveltejs/kit";
import { formSchema } from "@/transcation/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import dayjs from "dayjs";

export const load = async ({ cookies, params }) => {
  const id = params.id;
  if (!isCuid(id)) error(400, "Invalid ID format");
  const accessToken = cookies.get("access_token") ?? "";
  const response = await getTransaction(accessToken, id);
  if (!response) {
    error(404, "Transaction not found");
  }
  const { data } = response;
  const defaultValues = {
    purchaseDate: dayjs(data.purchaseDate).format("YYYY-MM-DD"),
    direction: data.direction,
    symbol: data.symbol,
    amount: data.amount,
    price: data.price,
    note: data.note ?? "",
  };
  return {
    form: await superValidate(defaultValues, zod(formSchema)),
    id,
  };
};

export const actions = {
  update: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return { form };
    }
    const access_token = event.cookies.get("access_token") ?? "";
    const id = event.params.id;
    await updateTransaction({
      id,
      access_token,
      symbol: form.data.symbol,
      amount: form.data.amount,
      price: form.data.price,
      note: form.data.note,
      direction: form.data.direction,
      purchaseDate: dayjs(form.data.purchaseDate).startOf("day").toDate(),
    } as UpdateTransactionParams);
    return redirect(303, "/transcation");
  },
  delete: async (event) => {
    const access_token = event.cookies.get("access_token") ?? "";
    console.log(access_token);
    const id = event.params.id;
    if (!isCuid(id)) error(400, "Invalid ID format");
    await deleteTransaction({
      id,
      access_token,
    } as UpdateTransactionParams);
    return redirect(303, "/transcation");
  },
};
