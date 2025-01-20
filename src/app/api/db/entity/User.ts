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
