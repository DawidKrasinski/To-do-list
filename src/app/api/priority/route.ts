import { NextResponse } from "next/server";
import { getDB } from "../db";
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
