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
    await connection.query(
      `UPDATE tasks SET done = ?, doneDate = ? WHERE id = ?;`,
      [body.done, body.doneDate, parseInt(id, 10)]
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use put method", error);
    return NextResponse.json({ error: "cant use put method" }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: number } }) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    await connection.query(`DELETE FROM tasks WHERE id = ?;`, [params.id]);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use delete method", error);
    return NextResponse.json(
      { error: "cant use delete method" },
      { status: 500 }
    );
  }
}
