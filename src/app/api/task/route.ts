import { NextResponse, NextRequest } from "next/server";
import { useDataSource } from "../db/data-source";
import { Task } from "../db/entity/Task";
import { Priority } from "../db/entity/Priority";

export async function GET() {
  try {
await useDataSource()
const tasks = await Task.find()
return NextResponse.json(tasks)
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await useDataSource()

  try {
    const body = await req.json();
    const priority = await Priority.findOneBy({id: body.priority})
    console.log(priority)

    if(!priority) return NextResponse.json({error: "Priority not found"}, {status: 500})

    const task = new Task(
      body.name,
      new Date(body.date),
      body.startTime,
      body.endTime, 
      priority
    )

    await task.save()
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use post method", error);
    return NextResponse.json(
      { error: "cant use post method" },
      { status: 500 }
    );
  }
}
