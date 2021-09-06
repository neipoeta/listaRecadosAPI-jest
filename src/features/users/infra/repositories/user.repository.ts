import { UserEntity } from '..';
import { User } from '../../domain';

interface ParamsCreate {
    name: string,
    login?: string,
    password?: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserRepository {
    async create(params: ParamsCreate): Promise<User> {
        const { name, login, password, createdAt, updatedAt } = params;
        const user = await UserEntity.create({
            name,
            login, 
            password, 
            createdAt, 
            updatedAt
        }).save();       

        return {
            uid: user.uid,
            name: user.name,
            login: user.login?.toString(), 
            password: user.password, 
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    async getAll(): Promise<User[]> {
        const users = await UserEntity.find();

        return await users.map(user => ({
            uid: user.uid,
            name: user.name,
            login: user.login, 
            password: user.password, 
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    }

    async getOne(uid: string): Promise<User> {
        let user = await UserEntity.findOne(uid);

        if (!user) {
            throw new Error('...');
        }

        user = user as UserEntity;

        return {
            uid: user.uid,
            name: user.name,
            login: user.login,  
            password: user.password, 
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    async update(uid: string, params: User): Promise<User | null> {
        const user = await UserEntity.findOne(uid);

        if (!user) {
            return null;
        }
        
        user.login = params.login;
        user.save();

        return {
            uid: user.uid,
            name: user.name,
            login: user.login,
            password: user.password
        };
    }

    async delete(uid: string): Promise<void> {
        const user = await UserEntity.findOne(uid);

        if (user) {
            user.remove();
        }
    }
}