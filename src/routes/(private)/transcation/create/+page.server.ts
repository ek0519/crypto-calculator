import { formSchema } from "@/transcation/schema.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "sveltekit-superforms";
import dayjs from "dayjs";
import { redirect } from "@sveltejs/kit";
import { createTransaction } from "$api/backend";

export const load: PageServerLoad = async () => {
  const defaultValues = {
    purchaseDate: dayjs().format("YYYY-MM-DD"),
    direction: "BUY" as const,
    symbol: "Bitcoin",
    amount: 1,
    price: 1,
    note: "",
  };
  return {
    form: await superValidate(defaultValues, zod(formSchema)),
  };
};

export const actions: Actions = {
  create: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const access_token = event.cookies.get("access_token") ?? "";
    await createTransaction({
      access_token,
      symbol: form.data.symbol,
      amount: form.data.amount,
      price: form.data.price,
      note: form.data.note,
      direction: form.data.direction,
      purchaseDate: dayjs(form.data.purchaseDate).startOf("day").toDate(),
    });
    return redirect(303, "/transcation");
  },
};
