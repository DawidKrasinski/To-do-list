import { NextResponse, NextRequest } from "next/server";
import { getDB } from "../db";
import { useDataSource } from "../db/data-source";
import { Task } from "../db/entity/Task";
import { Priority } from "../db/entity/Priority";

export async function GET() {
  // const connection = await getDB();
  // if (!connection) {
  //   return NextResponse.json(
  //     { error: "Can't connect to the database" },
  //     { status: 500 }
  //   );
  // }

  try {
//     const [results] = await connection.query(
//       `SELECT 
//   t.id, 
//   t.name, 
//   t.done, 
//   DATE_FORMAT(t.date, '%Y-%m-%d') AS date, 
//   t.startTime, 
//   t.endTime, 
//   DATE_FORMAT(t.doneDate, '%Y-%m-%d') AS doneDate, 
//   p.color
// FROM tasks t
// LEFT JOIN priority p ON t.priority = p.id
// WHERE NOT (t.done = 1 AND DATE(t.doneDate) != CURRENT_DATE)
// ORDER BY t.done ASC, t.startTime ASC;
// `
//     );
    return NextResponse.json([]);
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
