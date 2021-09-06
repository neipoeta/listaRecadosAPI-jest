import {
    MigrationInterface, 
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm';

export class CreateTableProjectRate1627081518108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'projects_rate',
                columns: [
                    {
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'user_uid',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'project_uid',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'rate',
                        type: 'integer',
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
                        referencedTableName: 'users'
                    }),
                    new TableForeignKey({
                        columnNames: ['project_uid'],
                        referencedColumnNames: ['uid'],
                        referencedTableName: 'projects'
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects_rate', true, true, true);
    }

}
