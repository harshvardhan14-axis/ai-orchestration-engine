import { z } from "zod";

export const ValidationErrorSchema =
  z.object({
    stage: z.string(),

    type: z.string(),

    message: z.string(),

    path: z.string().optional(),
  });

export const ValidationResultSchema =
  z.object({
    success: z.boolean(),

    errors: z.array(
      ValidationErrorSchema
    ),
  });

export type ValidationError = z.infer<
  typeof ValidationErrorSchema
>;

export type ValidationResult = z.infer<
  typeof ValidationResultSchema
>;