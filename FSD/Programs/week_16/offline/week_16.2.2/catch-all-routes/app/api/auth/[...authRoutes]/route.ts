import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/auth/<anything> -> Returns the following JSON.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ authRoutes: string[] }> },
) {
  const resolvedParams = await params;

  // params has key "authRoutes" with an array of strings.
  console.log(resolvedParams); // http://localhost:3000/api/auth/random -> { authRoutes: [ 'random' ] }

  return NextResponse.json({
    message: "Hello, from Catch all handler /api/auth/[...authRoutes]",
  });
}
