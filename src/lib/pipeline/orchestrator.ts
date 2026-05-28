import {
  callGroq,
  callGemini,
  callOpenRouter,
}
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
  userPrompt: string,
  provider: string
) {

  const startTime =
    Date.now();

  let intentRaw: string = "";

  try {

    if (
      provider === "gemini"
    ) {

      intentRaw =
        (await callGemini(
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
- return ONLY raw JSON
- no markdown
- no explanation

User Request:
${userPrompt}
`
        )) || "";

    } else if (
      provider ===
      "openrouter"
    ) {

      intentRaw =
        (await callOpenRouter(
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
- return ONLY raw JSON
- no markdown
- no explanation

User Request:
${userPrompt}
`
        )) || "";

    } else {

      intentRaw =
        (await callGroq(
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
- return ONLY raw JSON
- no markdown
- no explanation

User Request:
${userPrompt}
`
        )) || "";
    }

  } catch (error) {

    console.log(
      "Provider failed, using Groq fallback"
    );

    intentRaw =
      (await callGroq(
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
- return ONLY raw JSON
- no markdown
- no explanation

User Request:
${userPrompt}
`
      )) || "";
  }

  let parsedIntent: unknown;

  try {

    parsedIntent =
      JSON.parse(intentRaw || "{}");

  } catch {

    parsedIntent = {
      appName:
        "Generated App",

      appType: "crm",

      features: [
        "dashboard",
        "analytics",
      ],

      entities: [
        "User",
        "Task",
      ],

      integrations_requested:
        [],

      assumptions: [
        "Fallback intent used",
      ],
    };
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

    provider,

    intent: parsedIntent,

    schema: parsedSchema,

    appSpec: parsedSpec,

    workflowStubs,
  };
}