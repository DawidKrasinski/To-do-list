import "reflect-metadata"
import { BaseEntity, DataSource } from "typeorm"
import { Task } from "./entity/Task"
import { Priority } from "./entity/Priority"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "example",
    database: "todo-list",
    entities: [Task, Priority],
    synchronize: true,
    logging: false, 
})

export const useDataSource = async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize()
    BaseEntity.useDataSource(AppDataSource)
    return AppDataSource
}