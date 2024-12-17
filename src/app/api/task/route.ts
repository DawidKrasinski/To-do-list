import { NextResponse, NextRequest } from "next/server";
import { getDB } from "../db";

export async function GET() {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const [results] = await connection.query(
      `SELECT 
  t.id, 
  t.name, 
  t.done, 
  DATE_FORMAT(t.date, '%Y-%m-%d') AS date, 
  t.startTime, 
  t.endTime, 
  DATE_FORMAT(t.doneDate, '%Y-%m-%d') AS doneDate, 
  p.color
FROM tasks t
LEFT JOIN priority p ON t.priority = p.id
WHERE NOT (t.done = 1 AND DATE(t.doneDate) != CURRENT_DATE)
ORDER BY t.startTime ASC;
`
    );
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    await connection.query(
      `INSERT INTO tasks (name, done, priority, description, startTime, endTime, date) VALUES (?, false, ?, ?, ?, ?, ?);
`,
      [
        body.name,
        body.priority,
        body.description,
        body.startTime,
        body.endTime,
        body.date,
      ]
    );
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use post method", error);
    return NextResponse.json(
      { error: "cant use post method" },
      { status: 500 }
    );
  }
}
