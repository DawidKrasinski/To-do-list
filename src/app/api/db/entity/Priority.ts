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

// `SELECT 
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