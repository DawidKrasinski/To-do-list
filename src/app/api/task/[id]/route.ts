import { getDB } from "../../db";
import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../../db/data-source";
import { Task } from "../../db/entity/Task";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await useDataSource()
  const { id } = context.params;

  try {
    const taskQuery = await Task.findOne({ where: { id: parseInt(id) }, relations: ['priority'] })
    if(!taskQuery) throw "Task not found"

    const task = {
      id: taskQuery.id,
      name: taskQuery.name, 
      description: taskQuery.description,
      done: taskQuery.done,
      doneDate: taskQuery.doneDate,
      priority: taskQuery.priority.id,
      startTime: taskQuery.startTime,
      endTime: taskQuery.endTime,
      date: taskQuery.date,
      color: taskQuery.priority.color,
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Can't use GET method:", error);
    return NextResponse.json(
      { error: "Can't use GET method" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await useDataSource()

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

      await Task
      .createQueryBuilder()
      .update(Task)
      .set({done: body.done, doneDate: new Date().toISOString().split("T")[0]})
      .where("id = :id", {id: parseInt(id)})
      .execute()

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use PATCH method:", error);
    return NextResponse.json(
      { error: "Can't use PATCH method" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await useDataSource()

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {

    await Task
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", {id: parseInt(id)})
      .execute()

    return NextResponse.json(
      { message: "Task set as deleted successfully" },
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
      "UPDATE tasks SET name = ?, priority = ?, description = ?, startTime = ?, endTime = ?, date = ? WHERE id = ?;",
      [
        body.name,
        body.priority,
        body.description,
        body.startTime,
        body.endTime,
        body.date,
        body.id,
      ]
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
