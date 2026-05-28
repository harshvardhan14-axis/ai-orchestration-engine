import { z } from "zod";

export const FieldSchemaZod =
  z.object({
    name: z.string(),

    type: z.string(),

    nullable:
      z.boolean().optional(),

    isRelation:
      z.boolean().optional(),

    isPrimary:
      z.boolean().optional(),

    isUnique:
      z.boolean().optional(),
  });

export const EntitySchemaZod =
  z.object({
    name: z.string(),

    tableName: z.string(),

    fields: z.array(
      FieldSchemaZod
    ),
  });

export const DataSchemaZod =
  z.object({
    entities: z
      .array(EntitySchemaZod)
      .default([]),
  });

export type DataSchema = z.infer<
  typeof DataSchemaZod
>;