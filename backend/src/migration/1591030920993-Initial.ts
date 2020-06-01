import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1591030920993 implements MigrationInterface {
    name = 'Initial1591030920993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "working_place" ("id" SERIAL NOT NULL, "telephone" character varying NOT NULL, "IPAddress" character varying NOT NULL, "password" character varying NOT NULL, "position" character varying NOT NULL, "description" character varying NOT NULL, "AO" character varying NOT NULL, "stationId" integer, CONSTRAINT "PK_4804cb3a8f975755d00c4513225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "station" ("id" SERIAL NOT NULL, "description" text NOT NULL, "UNM" character varying(10) NOT NULL, "theNextStationId" integer NOT NULL, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "role" character varying(10) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "station_stations_station" ("stationId_1" integer NOT NULL, "stationId_2" integer NOT NULL, CONSTRAINT "PK_107a8e7c41ea04204b221e12803" PRIMARY KEY ("stationId_1", "stationId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fd3c95296739667d4de87c8a6" ON "station_stations_station" ("stationId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bc3936a4a0e1f4df59eed8d5f" ON "station_stations_station" ("stationId_2") `);
        await queryRunner.query(`ALTER TABLE "working_place" ADD CONSTRAINT "FK_dd97140053b461a5ea7661c366a" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "station_stations_station" ADD CONSTRAINT "FK_4fd3c95296739667d4de87c8a66" FOREIGN KEY ("stationId_1") REFERENCES "station"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "station_stations_station" ADD CONSTRAINT "FK_2bc3936a4a0e1f4df59eed8d5f2" FOREIGN KEY ("stationId_2") REFERENCES "station"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_stations_station" DROP CONSTRAINT "FK_2bc3936a4a0e1f4df59eed8d5f2"`);
        await queryRunner.query(`ALTER TABLE "station_stations_station" DROP CONSTRAINT "FK_4fd3c95296739667d4de87c8a66"`);
        await queryRunner.query(`ALTER TABLE "working_place" DROP CONSTRAINT "FK_dd97140053b461a5ea7661c366a"`);
        await queryRunner.query(`DROP INDEX "IDX_2bc3936a4a0e1f4df59eed8d5f"`);
        await queryRunner.query(`DROP INDEX "IDX_4fd3c95296739667d4de87c8a6"`);
        await queryRunner.query(`DROP TABLE "station_stations_station"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "station"`);
        await queryRunner.query(`DROP TABLE "working_place"`);
    }

}
