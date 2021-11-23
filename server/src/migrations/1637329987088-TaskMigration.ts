import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskMigration1637329987088 implements MigrationInterface {
    name = 'TaskMigration1637329987088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "username" character varying(64) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "task" ("taskId" SERIAL NOT NULL, "taskName" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isCompleted" boolean NOT NULL DEFAULT false, "isImportant" boolean NOT NULL DEFAULT false, "userIdUserId" integer, CONSTRAINT "PK_c5a68aa4b5c8d38a06f8e8d4c57" PRIMARY KEY ("taskId"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_18ac2bc0deed99cc1bf5ba3dec5" FOREIGN KEY ("userIdUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_18ac2bc0deed99cc1bf5ba3dec5"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
