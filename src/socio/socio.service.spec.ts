import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Socio } from './entities/socio.entity';
import { Repository, DeleteResult } from 'typeorm';

describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<Socio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocioService,
        {
          provide: getRepositoryToken(Socio),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<Socio>>(getRepositoryToken(Socio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of socios', async () => {
    const socioArray = [new Socio(), new Socio()];
    jest.spyOn(repository, 'find').mockResolvedValue(socioArray);

    expect(await service.findAll()).toBe(socioArray);
  });

  it('findOne should return a socio', async () => {
    const socio = new Socio();
    jest.spyOn(repository, 'findOne').mockResolvedValue(socio);

    expect(await service.findOne(1)).toBe(socio);
  });

  it('create should add a new socio', async () => {
    const socio = new Socio();
    jest.spyOn(repository, 'save').mockResolvedValue(socio);

    expect(await service.create(socio)).toBe(socio);
  });

  it('update should modify a socio', async () => {
    const socio = new Socio();
    jest.spyOn(repository, 'findOne').mockResolvedValue(socio);
    jest.spyOn(repository, 'save').mockResolvedValue(socio);

    expect(await service.update(1, socio)).toBe(socio);
  });

  it('delete should remove a socio', async () => {
    const deleteResult: DeleteResult = { affected: 1, raw: {} };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

    expect(await service.delete(1)).toBe(undefined);
  });
});
