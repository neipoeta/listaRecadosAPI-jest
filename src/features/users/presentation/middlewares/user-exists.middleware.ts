import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { ok, badRequest, InvalidParamError } from '../../../../core/presentation';
import { Project } from '../../domain';
import { UserRepository } from '../../../../core/infra';

export class UserExistsMiddleware {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const body: Project = request.body;        
        const user = await new UserRepository().getOne(body.userUid);

        if (!user) {
            return badRequest(new InvalidParamError('userUid'));
        }

        return ok({});
    }
}