import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddTimeInfo1612773437543 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const addTimeInfo = async (name: string) => {
      await queryRunner.addColumns(name, [
          new TableColumn({name: 'createdAt', type: 'time', isNullable: false, default: 'now()'}),
          new TableColumn({name: 'updatedAt', type: 'time', isNullable: false, default: 'now()'})
        ]
      )
    }
    await addTimeInfo('users')
    await addTimeInfo('posts')
    await addTimeInfo('comments')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dropTimeInfo = async (name: string) => {
      await queryRunner.dropColumn(name, 'createdAt')
      await queryRunner.dropColumn(name, 'updatedAt')
    }
    await dropTimeInfo('users')
    await dropTimeInfo('posts')
    await dropTimeInfo('comments')

  }

}
