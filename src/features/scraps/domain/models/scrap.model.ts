import { User } from "../../../users/domain";

export interface Scrap {
    uid: string;
    scrapText: string;
    title?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userUID: string;
}