import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { Priority } from "../db/entity/Priority";

export async function GET() {
  await useDataSource()

  try {
    const results = await Priority.find()
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await useDataSource()
  const body = await req.json()

  try {
    const priority = new Priority(
      body.name,
      body.order,
      body.color,
    )
    console.log(priority)
    return NextResponse.json(priority);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}