import { NextResponse }
from "next/server";

import { runPipeline }
from "../../../src/lib/pipeline/orchestrator";

export async function POST(
  req: Request
) {
  try {
    const {
      prompt,
      provider,
    } = await req.json();

    const result =
      await runPipeline(
        prompt || "",
        provider || "groq"
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },

      {
        status: 500,
      }
    );
  }
}
