import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { Priority } from "./Priority"

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name: string

    @Column("bool")
    done: boolean = false

    @Column("date")
    date: Date

    @Column({length: 5})
    startTime: string

    @Column({length: 5})
    endTime: string

    @Column("date", {nullable: true})
    doneDate: Date | null = null

    @ManyToOne(() => Priority, (priority) => priority.tasks)
    priority: Priority

    constructor(
        name: string,
        date: Date,
        startTime: string,
        endTime: string,
        priority: Priority
    ){
        super()
        this.name = name
        this.date = date
        this.startTime = startTime
        this.endTime = endTime
        this.priority = priority
    }
}
