import { z } from "zod";

export const PageSpecSchema =
  z.object({
    name: z.string(),

    route: z.string(),

    layout: z
      .enum([
        "list",
        "detail",
        "dashboard",
        "settings",
      ])
      .optional(),

    boundEntity:
      z.string().optional(),
  });

export const AppSpecSchema =
  z.object({
    pages: z
      .array(PageSpecSchema)
      .default([]),
  });

export type AppSpec = z.infer<
  typeof AppSpecSchema
>;