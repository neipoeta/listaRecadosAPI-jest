import { Router } from'express';
import { EMVC } from '../../../../core/presentation';
import { middlewareAdapter, routerMvcAdapter } from '../../../../core/presentation';
import { UserController } from '../controllers';
import { UserMiddleware, UserExistsMiddleware } from '../middlewares';
import { MVCController } from '../../../../core/presentation';
import { UserRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new UserRepository();
    const cache = new CacheRepository();
    return new UserController(repository, cache);
};

export default class UserRoutes {
    public init(routes: Router) {
        routes.get('/users', 
               routerMvcAdapter(makeController(), EMVC.INDEX));

        routes.get('/users/:uid',
               routerMvcAdapter(makeController(), EMVC.SHOW));

        routes.post('/users', 
               [
                     middlewareAdapter(new UserMiddleware()),
                     middlewareAdapter(new UserExistsMiddleware())
               ],
               routerMvcAdapter(makeController(), EMVC.STORE));

        routes.put('/users/:uid', 
               middlewareAdapter(new UserMiddleware()),
               routerMvcAdapter(makeController(), EMVC.UPDATE));

        routes.delete('/users/:uid',
               routerMvcAdapter(makeController(), EMVC.DELETE));
    }
}