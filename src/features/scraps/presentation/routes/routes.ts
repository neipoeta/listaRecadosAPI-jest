import { Router } from'express';
import { EMVC } from '../../../../core/presentation';
import { routerMvcAdapter } from '../../../../core/presentation';
import { ScrapController } from '../controllers';
import { MVCController } from '../../../../core/presentation';
import { ScrapRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new ScrapRepository();
    const cache = new CacheRepository();
    return new ScrapController(repository, cache);
};

export default class ScrapRoutes {
    public init(routes: Router) {
        routes.get('/scrap', 
               routerMvcAdapter(makeController(), EMVC.INDEX));

        routes.get('/scrap/:uid',
               routerMvcAdapter(makeController(), EMVC.SHOW));

        routes.post('/scrap', 
               routerMvcAdapter(makeController(), EMVC.STORE));
    }
}