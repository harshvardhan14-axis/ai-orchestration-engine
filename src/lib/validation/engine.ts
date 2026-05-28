import type {
  ValidationResult,
  ValidationError,
} from "@/types/validation";

import { AppIntentSchema } from "@/types/intent";

import { DataSchemaZod } from "@/types/schema";

import { AppSpecSchema } from "@/types/appspec";

export function makeValidationResult(
  errors: ValidationError[]
): ValidationResult {
  return {success: errors.length === 0,

    errors,
  };
}

export function makeError(
  stage: string,

  type: string,

  message: string,

  path?: string
): ValidationError {
  return {
    stage,

    type,

    message,

    path,
  };
}

export function validateIntent(
  data: unknown
): ValidationResult {
  const result =
    AppIntentSchema.safeParse(data);

  if (result.success) {
    return makeValidationResult([]);
  }

  return makeValidationResult(
    result.error.issues.map((issue) =>
      makeError(
        "intent",

        "schema_error",

        issue.message,

        issue.path.join(".")
      )
    )
  );
}

export function validateSchema(
  data: unknown
): ValidationResult {
  const result =
    DataSchemaZod.safeParse(data);

  if (result.success) {
    return makeValidationResult([]);
  }

  return makeValidationResult(
    result.error.issues.map((issue) =>
      makeError(
        "schema",

        "schema_error",

        issue.message,

        issue.path.join(".")
      )
    )
  );
}

export function validateAppSpec(
  data: unknown
): ValidationResult {
  const result =
    AppSpecSchema.safeParse(data);

  if (result.success) {
    return makeValidationResult([]);
  }

  return makeValidationResult(
    result.error.issues.map((issue) =>
      makeError(
        "appspec",

        "schema_error",

        issue.message,

        issue.path.join(".")
      )
    )
  );
}