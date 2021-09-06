export interface User {
    uid: string;
    name: string;
    login: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}