import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreatePosts1612749404185 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'posts', columns: [
        {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
        {name: 'title', type: 'varchar'},
        {name: 'content', type: 'text'},
        {name: 'author_id', type: 'int'},
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('posts')
  }
}
