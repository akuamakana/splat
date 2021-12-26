import { MigrationInterface, QueryRunner } from 'typeorm';

export class Truncate1640282488434 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "comment" CASCADE`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
