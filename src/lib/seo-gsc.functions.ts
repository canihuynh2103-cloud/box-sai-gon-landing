import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { refreshGsc } from "./seo-gsc.server";

export const refreshSearchConsole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((value: unknown) =>
    z.object({ siteUrl: z.string().max(2000).optional() }).parse(value),
  )
  .handler(async ({ data, context }) => refreshGsc(context.supabase, context.userId, data.siteUrl));
