import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { submitQuoteHandler, quoteSchema } from "./quote-handler.server";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => submitQuoteHandler(data as z.infer<typeof quoteSchema>));
