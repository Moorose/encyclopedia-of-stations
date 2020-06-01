import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStationAndWP1591025329390 implements MigrationInterface {
    name = 'CreateStationAndWP1591025329390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "working_place" ("id" SERIAL NOT NULL, "telephone" character varying NOT NULL, "IPAddress" character varying NOT NULL, "password" character varying NOT NULL, "position" character varying NOT NULL, "description" character varying NOT NULL, "AO" character varying NOT NULL, "stationId" integer, CONSTRAINT "PK_4804cb3a8f975755d00c4513225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "station" ("id" SERIAL NOT NULL, "description" text NOT NULL, "UNM" character varying(10) NOT NULL, "theNextStationId" integer NOT NULL, "thePreviousStationId" integer NOT NULL, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "working_place" ADD CONSTRAINT "FK_dd97140053b461a5ea7661c366a" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_place" DROP CONSTRAINT "FK_dd97140053b461a5ea7661c366a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "station"`);
        await queryRunner.query(`DROP TABLE "working_place"`);
    }

}
