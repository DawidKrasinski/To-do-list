import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { Priority } from "../db/entity/Priority";

export async function GET() {
  await useDataSource();

  try {
    const results = await Priority.find({ order: { order: "ASC" } });
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await useDataSource();
  const body = await req.json();

  try {
    const priority = new Priority(body.name, body.order, body.color);
    console.log(priority);
    await priority.save();
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  await useDataSource();
  const body = await req.json();

  try {
    const priorities = await Priority.find({ order: { order: "ASC" } });
    const [movedElement] = priorities.splice(body.fromOrder, 1);
    priorities.splice(body.toIndex, 0, movedElement);

    for (let i = 0; i < priorities.length; i++) {
      priorities[i].order = i;
    }

    await Priority.save(priorities);

    return NextResponse.json(
      { message: "Priority updated successfully" },
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
