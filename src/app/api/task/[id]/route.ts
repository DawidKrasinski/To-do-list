import { getDB } from "../db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const connection = await getDB();
  const { id } = context.params;
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    await connection.query(`UPDATE tasks SET done = ? WHERE id = ?;`, [
      body.done,
      parseInt(id, 10),
    ]);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use put method", error);
    return NextResponse.json({ error: "cant use put method" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
