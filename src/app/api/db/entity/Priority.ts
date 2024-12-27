import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Task } from "./Task"

@Entity()
export class Priority extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    color!: string
    
    @Column("int")
    order!: number

    @OneToMany(() => Task, (task) => task.priority)
    tasks!: Task[]
}