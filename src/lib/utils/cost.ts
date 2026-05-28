export function estimateCost(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const total =
    inputTokens + outputTokens;

  return total * 0.000001;
}