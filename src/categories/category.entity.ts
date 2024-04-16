import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_test_id" })
  id: string;

  @Column({ unique: true, type: "varchar" })
  slug: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @CreateDateColumn()
  created_date: Date;

  @Column({ type: "boolean" })
  active: boolean;
}
