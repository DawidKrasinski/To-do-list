import { NextRequest, NextResponse } from "next/server"
import { useDataSource } from "../../db/data-source"
import { Priority } from "../../db/entity/Priority"

export async function PUT(req: NextRequest, context: { params: {id: string} }){
  await useDataSource()
  const {id} = context.params
  const body = await req.json()

  try{
    await Priority.createQueryBuilder()
    .update()
    .set({name: body.name, color: body.color, order: body.order})
    .where("id = :id", {id: parseInt(id)})
    .execute()
  
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