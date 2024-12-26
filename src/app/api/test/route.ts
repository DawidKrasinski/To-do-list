import { NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { Task } from "../db/entity/Task";

export async function GET () {
    await useDataSource()
    const tasks = await Task.find()
    return NextResponse.json(tasks)
}