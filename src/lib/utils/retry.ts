interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  retryOn?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let lastError: unknown;

  for (
    let i = 0;
    i < options.maxAttempts;
    i++
  ) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const shouldRetry =
        options.retryOn
          ? options.retryOn(error)
          : true;

      if (!shouldRetry) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(
          resolve,
          options.delayMs
        )
      );
    }
  }

  throw lastError;
}