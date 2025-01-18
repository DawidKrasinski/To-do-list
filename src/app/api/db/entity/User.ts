import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  localStorageId!: string;

  @Column()
  name!: string;

  @Column()
  photo!: string;

  @Column()
  theme!: string;

  // @Column({ nullable: true })
  // backgroundColor: string | null = null;

  // @Column({ nullable: true })
  // textColor: string | null = null;

  // @Column({ nullable: true })
  // navBarColor: string | null = null;

  // @Column({ nullable: true })
  // fieldColor: string | null = null;

  constructor(
    localStoreId?: string,
    name?: string,
    photo?: string,
    theme?: string
  ) {
    super();
    this.localStorageId = localStoreId ?? "";
    this.name = name ?? "";
    this.photo = photo ?? "";
    this.theme = theme ?? "";
  }
}
