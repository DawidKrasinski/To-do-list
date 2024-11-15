import { NextResponse } from "next/server";
import { getDB } from "./db";

export async function GET() {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json({ message: "cant find databse", status: 500 });
  }

  try {
    const [results] = await connection.query("SELECT * FROM tasks");
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}
