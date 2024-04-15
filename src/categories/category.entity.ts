import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_test_id" })
  id: string;

  @Column({ unique: true, type: "varchar" })
  slug: string;

  @Index({ fulltext: true })
  @Column({ type: "varchar" })
  name: string;

  @Index({ fulltext: true })
  @Column({ type: "varchar", nullable: true })
  description?: string;

  @CreateDateColumn()
  created_date: Date;

  @Column({ type: "boolean" })
  active: boolean;
}
