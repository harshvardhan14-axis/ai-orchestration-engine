import type {
  ValidationError,
} from "../../types/validation";

export interface RepairResult {
  repaired: boolean;

  repairedData?: unknown;

  remainingErrors:
    ValidationError[];
}

export function attemptRepair(
  data: unknown,

  errors: ValidationError[]
): RepairResult {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    return {
      repaired: false,

      remainingErrors: errors,
    };
  }

  const cloned = structuredClone(data);

  const remainingErrors: ValidationError[] =
    [];

  for (const error of errors) {
    if (
      error.type ===
      "missing_required"
    ) {
      continue;
    }

    remainingErrors.push(error);
  }

  return {
    repaired:
      remainingErrors.length === 0,

    repairedData: cloned,

    remainingErrors,
  };
}