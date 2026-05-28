export function safeParseJSON(input: string) {
  try {
    return {
      success: true,
      data: JSON.parse(input),
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}

export function recoverTruncatedJSON(
  input: string
): string | null {
  try {
    let fixed = input.trim();

    const openBraces =
      (fixed.match(/{/g) || []).length;

    const closeBraces =
      (fixed.match(/}/g) || []).length;

    const missing =
      openBraces - closeBraces;

    if (missing > 0) {
      fixed += "}".repeat(missing);
    }

    JSON.parse(fixed);

    return fixed;
  } catch {
    return null;
  }
}