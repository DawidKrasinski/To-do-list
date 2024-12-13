import { getDB } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json({ message: "cant find databse", status: 500 });
  }

  try {
    const [results] = await connection.query(
      `SELECT * FROM tasks WHERE id = ?`,
      [id]
    );
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}
