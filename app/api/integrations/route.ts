import { NextResponse }
from "next/server";

import {
  integrationRegistry,
} from "../../../src/lib/integrations/registry";

export async function GET() {
  return NextResponse.json({
    success: true,

    integrations:
      integrationRegistry,
  });
}