import { MigrationInterface, QueryRunner } from "typeorm";

export class New1713167669897 implements MigrationInterface {
    name = 'New1713167669897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "pk_test_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
