import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProfile1626220541213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profile_data',
                columns: [
                    { 
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '11',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'user_uid',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['user_uid'],
                        referencedColumnNames: ['uid'],
                        referencedTableName: 'users',
                        name: 'profile_data_users'
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile_data', true, true, true);
    }

}
