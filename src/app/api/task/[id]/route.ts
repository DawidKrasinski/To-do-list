import { getDB } from "../db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
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
    const body = await req.json();
    await connection.query(
      "UPDATE tasks SET done = ?, doneDate = CURRENT_DATE WHERE id = ?;",
      [body.done, /*body.doneDate,*/ parseInt(id, 10)]
    );
    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use PUT method:", error);
    return NextResponse.json(
      { error: "Can't use PUT method" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use DELETE method:", error);
    return NextResponse.json(
      { error: "Can't use DELETE method" },
      { status: 500 }
    );
  }
}
