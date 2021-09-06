import {
    MigrationInterface, 
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm";

export class CreateTableTasks1627599737163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'author_uid',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'executer_uid',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'project_uid',
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
                        columnNames: ['author_uid'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uid']
                    }),
                    new TableForeignKey({
                        columnNames: ['executer_uid'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['uid']
                    }),
                    new TableForeignKey({
                        columnNames: ['project_uid'],
                        referencedTableName: 'projects',
                        referencedColumnNames: ['uid']
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks', true, true, true);
    }
}
