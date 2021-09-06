import {
    HttpRequest,
    notFound,
    ok,
    serverError,
    ProjectController
} from '../../../../../src/features/projects/presentation';
import { 
    ProjectRepository,
    CacheRepository
} from '../../../../../src/features/projects/infra';
import { Project } from '../../../../../src/core/domain/models';

jest.mock('../../../../../src/features/projects/infra/repositories/project.repository.ts');
jest.mock('../../../../../src/core/infra/repositories/cache.repository.ts');

const makeRequestStore = (): HttpRequest => ({
    body: {
        name: 'any_name',
        description: 'any_description',
        startAt: new Date(Date.now()).toLocaleDateString(),
        finishAt: new Date(Date.now()).toLocaleDateString(),
        userUid: 'any_uid'
    },
    params: {}
});

const makeRequestShow = (): HttpRequest => ({
    body: {},
    params: { uid: 'any_uid'}
});

const makeResult = (): Project => ({
    uid: 'any_uid',
    name: 'any_name',
    userUid: 'any_uid'
});

// SUT = System under test
const makeSut = (): ProjectController => {
    return new ProjectController(new ProjectRepository(), new CacheRepository());
}

describe('Project Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

   describe('Store', () => {
       test('should return code 500 when throw any exception', async () => {
            jest.spyOn(ProjectRepository.prototype, 'create')
                .mockRejectedValue(new Error());

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(serverError());
       });

       test('should call ProjectRepository when pass correct values', async () => {
            const createSpy = jest.spyOn(ProjectRepository.prototype, 'create');
            const sut = makeSut();

            await sut.store(makeRequestStore());

            expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
       });

       test('should return code 200 when valid data is provided', async () => {
           jest.spyOn(ProjectRepository.prototype, 'create')
               .mockResolvedValue(makeResult());

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(ok(makeResult()));
       });

       test('should call CacheRepository when pass correct values', async () => {
            jest.spyOn(ProjectRepository.prototype, 'create')
                .mockResolvedValue(makeResult());

            const setSpy = jest.spyOn(CacheRepository.prototype, 'set');
            const delSpy = jest.spyOn(CacheRepository.prototype, 'del');

            // SUT = System under test = o que está sendo testado
            const sut = makeSut();
            await sut.store(makeRequestStore());

            expect(setSpy).toHaveBeenCalledWith(
                'project:any_uid',
                makeResult()
            );

            expect(delSpy).toHaveBeenCalledWith('project:all');
       });
   }); 

//    describe('Index', () => {
//        test('should return code 500 when throw any exception', async () => {
//             jest.spyOn(CacheRepository.prototype, 'get')
//                 .mockRejectedValue(new Error());

//             const sut = makeSut();
//             const result = await sut.index();

//             expect(result).toEqual(serverError());
//        });

//        test('should call CacheRepository when pass correct values', async () => {
//             jest.spyOn(ProjectRepository.prototype, 'getAll')
//                 .mockResolvedValue([makeResult()]);

//             const getSpy = jest.spyOn(CacheRepository.prototype, 'get')
//                                .mockResolvedValue(null);
//             const setSpy = jest.spyOn(CacheRepository.prototype, 'set')
//                                .mockResolvedValue(null);

//             const sut = makeSut();
//             await sut.index();

//             expect(getSpy).toHaveBeenCalledWith('project:all');
//             expect(setSpy).toHaveBeenCalledWith('project:all', [makeResult()]);                 
//        });

//        test('should return code 200 when cache has any project', async () => {
//             jest.spyOn(CacheRepository.prototype, 'get')
//                 .mockResolvedValue([makeResult()]);

//             const sut = makeSut();
//             const result = await sut.index();

//             expect(result).toEqual(ok([makeResult()]));
//        });

//        test('should return code 404 when no project is found', async () => {
//             jest.spyOn(CacheRepository.prototype, 'get')
//                 .mockResolvedValue(null);
//             jest.spyOn(ProjectRepository.prototype, 'getAll')
//                 .mockResolvedValue([]);

//             const sut = makeSut();
//             const result = await sut.index();

//             expect(result).toEqual(notFound());
//        });

//        test('should return code 200 when repository has any projects', async () => {
//             jest.spyOn(CacheRepository.prototype, 'get')
//                 .mockResolvedValue(null);

//             jest.spyOn(ProjectRepository.prototype, 'getAll')
//                 .mockResolvedValue([makeResult()]);

//             const sut = makeSut();
//             const result = await sut.index();

//             expect(result).toEqual(ok([makeResult()]));
//        });
//    });

   describe('Show', () => {
       // tema de casa
   });
});