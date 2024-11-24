import { getDB } from "../../db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    await connection.query(`UPDATE products SET done = ? WHERE id = ?;`, [
      body.done,
      params.id,
    ]);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use put method", error);
    return NextResponse.json({ error: "cant use put method" }, { status: 500 });
  }
}
