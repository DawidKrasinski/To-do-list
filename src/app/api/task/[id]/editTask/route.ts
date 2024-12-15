import { getDB } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const [results] = await connection.query(
      `SELECT * FROM tasks WHERE id = ?`,
      [params.id]
    );
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}
