import { Scrap } from '../../domain';
import { ScrapEntity } from '..';
import { UserEntity } from '..';

interface ParamsCreate {
    uid: string;
    scrapText: string;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    userUID?: string;
}

export class ScrapRepository {
    async create(params: Scrap): Promise<Scrap> {
        const { title, scrapText, userUID } = params;

        const scrap = await ScrapEntity.create({
            title, 
            scrapText,  
            userUID
        }).save();

        return Object.assign({}, params, scrap);
    }

    async getAll(): Promise<Scrap[]> {
        const scraps = await ScrapEntity.find({
            relations: ['title', 'scrapText', 'userUID']
        });

        return scraps.map(scrap => ({
            uid: scrap.uid,
            title: scrap.title,
            scrapText: scrap.scrapText,
            userUID: scrap.userUID
        }));
    }

    async getOne(uid: string): Promise<Scrap | null> {
        const scrap = await ScrapEntity.findOne({
            where: { uid },
            relations: ['title', 'scrapText', 'userUID']
        });

        if (!scrap) {
            return null
        }

        return {
            uid: scrap.uid,
            title: scrap.title,
            scrapText: scrap.scrapText,
            userUID: scrap.userUID
        };
    }

    async update(uid: string, params: Scrap): Promise<Scrap | null> {
        const scrap = await ScrapEntity.findOne(uid);

        if (!scrap) {
            return null;
        }
        
        scrap.scrapText = params.scrapText;
        scrap.userUID = params.userUID;
        scrap.save();

        return {
            uid: scrap.uid,
            title: scrap.title,
            scrapText: scrap.scrapText,
            userUID: scrap.userUID
        };
    }

    async delete(uid: string): Promise<void> {
        const scrap = await ScrapEntity.findOne(uid);

        if (scrap) {
            scrap.remove();
        }
    }
}