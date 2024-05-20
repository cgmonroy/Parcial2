import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository, DeleteResult } from 'typeorm';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<Club>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        {
          provide: getRepositoryToken(Club),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<Club>>(getRepositoryToken(Club));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of clubs', async () => {
    const clubArray = [new Club(), new Club()];
    jest.spyOn(repository, 'find').mockResolvedValue(clubArray);

    expect(await service.findAll()).toBe(clubArray);
  });

  it('findOne should return a club', async () => {
    const club = new Club();
    jest.spyOn(repository, 'findOne').mockResolvedValue(club);

    expect(await service.findOne(1)).toBe(club);
  });

  it('create should add a new club', async () => {
    const club = new Club();
    jest.spyOn(repository, 'save').mockResolvedValue(club);

    expect(await service.create(club)).toBe(club);
  });

  it('update should modify a club', async () => {
    const club = new Club();
    jest.spyOn(repository, 'findOne').mockResolvedValue(club);
    jest.spyOn(repository, 'save').mockResolvedValue(club);

    expect(await service.update(1, club)).toBe(club);
  });

  it('delete should remove a club', async () => {
    const deleteResult: DeleteResult = { affected: 1, raw: {} };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

    expect(await service.delete(1)).toBe(undefined);
  });
});
