import {
    Entity,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    OneToOne
} from "typeorm";
import { v4 as uuid } from 'uuid';
import { ScrapEntity } from "./scrap.entity";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;
    
    @Column()
    name!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;


    @Column({name: 'created_at'})
    createdAt!: Date;

    @Column({name: 'updated_at'})
    updatedAt!: Date;


    @OneToMany(_ => ScrapEntity, scrap => scrap.user)
    scraps?: ScrapEntity[];

    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}

    // @ManyToOne(_ => UserEntity, user => user.users)
    // @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    // user!: UserEntity;

