import { NextResponse } from "next/server";
import { scrapeverbs1 } from "../../lib/scrapeverbs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const verb = searchParams.get("verb");

  if (!verb) {
    return NextResponse.json({ error: "Missing ?verb=" }, { status: 400 });
  }

  const data = await scrapeverbs1(verb);
  return NextResponse.json(data);
}
