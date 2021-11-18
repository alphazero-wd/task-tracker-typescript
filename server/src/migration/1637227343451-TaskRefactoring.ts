import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskRefactoring1637227343451 implements MigrationInterface {
    name = 'TaskRefactoring1637227343451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

}
