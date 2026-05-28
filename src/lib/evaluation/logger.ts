export interface EvaluationLog {
  prompt: string;

  success: boolean;

  latency: number;

  timestamp: string;
}

const logs:
  EvaluationLog[] = [];

export function logEvaluation(
  log: EvaluationLog
) {
  logs.push(log);

  console.log(
    "Evaluation Log:",
    log
  );
}

export function getLogs() {
  return logs;
}