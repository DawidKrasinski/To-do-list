import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../../db/data-source";
import { User } from "../../db/entity/User";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  console.log("context:", context);
  await useDataSource();
  try {
    const user = await User.findOneBy({
      localStoreId: context.params.id,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}
