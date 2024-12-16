import { getDB } from "@/app/api/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const connection = await getDB();

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const [results] = await connection.query(
      "SELECT * FROM tasks WHERE id = ?",
      [parseInt(id, 10)]
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Can't use GET method:", error);
    return NextResponse.json(
      { error: "Can't use GET method" },
      { status: 500 }
    );
  }
}
