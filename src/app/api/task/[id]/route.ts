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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use delete method", error);
    return NextResponse.json(
      { error: "Can't use delete method" },
      { status: 500 }
    );
  }
}
