import { callGroq }
from "../ai/gateway";

import {
  validateIntent,
  validateSchema,
  validateAppSpec,
} from "../validation/engine";

import { attemptRepair }
from "../repair/engine";

import {
  generateWorkflowStubs,
} from "../workflows/stub-generator";

import {
  generateSchema,
} from "../schema/generator";

import {
  generateAppSpec,
} from "../appspec/generator";

import {
  logEvaluation,
} from "../evaluation/logger";

export async function runPipeline(
  userPrompt: string
) {

  const startTime =
    Date.now();

  const intentRaw =
    await callGroq(
      `
You must return ONLY valid JSON.

Format:

{
  "appName": "CRM App",

  "appType": "crm",

  "features": [
    "authentication",
    "dashboard",
    "analytics"
  ],

  "entities": [
    "User",
    "Lead",
    "Task"
  ],

  "integrations_requested": [],

  "assumptions": []
}

Rules:
- appName must be string
- appType must be one of:
  "crm",
  "project_management",
  "ecommerce",
  "hr_tool"

- features must be array of strings
- entities must be array of strings
- integrations_requested must be array
- assumptions must be array
- return ONLY raw JSON
- no markdown
- no explanation

User Request:
${userPrompt}
`
    );

  let parsedIntent: unknown;

  try {
    parsedIntent =
      JSON.parse(intentRaw || "{}");
  } catch {
    parsedIntent = {};
  }

  const intentValidation =
    validateIntent(parsedIntent);

  if (
    !intentValidation.success
  ) {
    return {
      stage: "intent",

      success: false,

      errors:
        intentValidation.errors,
    };
  }

  const parsedSchema =
    generateSchema(
      ((parsedIntent as any)
        .entities || [])
    );

  const schemaValidation =
    validateSchema(parsedSchema);

  if (
    !schemaValidation.success
  ) {
    const repaired =
      attemptRepair(
        parsedSchema,

        schemaValidation.errors
      );

    if (!repaired.repaired) {
      return {
        stage: "schema",

        success: false,

        errors:
          repaired.remainingErrors,
      };
    }
  }

  const parsedSpec =
    generateAppSpec(
      parsedSchema
    );

  const appSpecValidation =
    validateAppSpec(parsedSpec);

  if (
    !appSpecValidation.success
  ) {
    return {
      stage: "appspec",

      success: false,

      errors:
        appSpecValidation.errors,
    };
  }

  const workflowStubs =
    generateWorkflowStubs(
      (parsedIntent as any)
        .appType
    );

  const latency =
    Date.now() - startTime;

  logEvaluation({
    prompt: userPrompt,

    success: true,

    latency,

    timestamp:
      new Date().toISOString(),
  });

  return {
    success: true,

    latency,

    intent: parsedIntent,

    schema: parsedSchema,

    appSpec: parsedSpec,

    workflowStubs,
  };
}