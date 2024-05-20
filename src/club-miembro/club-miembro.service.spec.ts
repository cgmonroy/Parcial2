import { Test, TestingModule } from '@nestjs/testing';
import { ClubMemberService } from './club-miembro.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity'; // ASDASGRG
import { Repository } from 'typeorm';

describe('ClubMemberService', () => {
  let service: ClubMemberService;
  let clubRepository: Repository<Club>;
  let socioRepository: Repository<Socio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubMemberService,
        {
          provide: getRepositoryToken(Club),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Socio),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClubMemberService>(ClubMemberService);
    clubRepository = module.get<Repository<Club>>(getRepositoryToken(Club));
    socioRepository = module.get<Repository<Socio>>(getRepositoryToken(Socio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addMemberToClub should add a socio to a club', async () => {
    const club = new Club();
    club.socios = [];
    const socio = new Socio();
    
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(socioRepository, 'findOne').mockResolvedValue(socio);
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    await service.addMemberToClub(1, 1);

    expect(club.socios.length).toBe(1);
    expect(club.socios[0]).toBe(socio);
  });

  it('findMembersFromClub should return an array of socios', async () => {
    const club = new Club();
    club.socios = [new Socio(), new Socio()];
    
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);

    expect(await service.findMembersFromClub(1)).toBe(club.socios);
  });

  it('findMemberFromClub should return a socio', async () => {
    const club = new Club();
    const socio = new Socio();
    club.socios = [socio];
    
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);

    expect(await service.findMemberFromClub(1, 1)).toBe(socio);
  });

  it('updateMembersFromClub should update socios of a club', async () => {
    const club = new Club();
    club.socios = [];
    const socios = [new Socio(), new Socio()];
    
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(socioRepository, 'findByIds').mockResolvedValue(socios);
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    await service.updateMembersFromClub(1, [1, 2]);

    expect(club.socios.length).toBe(2);
  });

  it('deleteMemberFromClub should remove a socio from a club', async () => {
    const club = new Club();
    const socio = new Socio();
    club.socios = [socio];
    
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    await service.deleteMemberFromClub(1, 1);

    expect(club.socios.length).toBe(0);
  });
});
