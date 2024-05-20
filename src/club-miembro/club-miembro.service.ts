import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';

@Injectable()
export class ClubMemberService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Socio)
    private socioRepository: Repository<Socio>,
  ) {}

  async addMemberToClub(clubId: number, socioId: number): Promise<void> {
    const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
    const socio = await this.socioRepository.findOne({ where: { id: socioId } });

    if (!club || !socio) {
      throw new NotFoundException('Club or Socio not found');
    }

    club.socios.push(socio);
    await this.clubRepository.save(club);
  }

  async findMembersFromClub(clubId: number): Promise<Socio[]> {
    const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
    if (!club) {
      throw new NotFoundException('Club not found');
    }
    return club.socios;
  }

  async findMemberFromClub(clubId: number, socioId: number): Promise<Socio> {
    const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
    if (!club) {
      throw new NotFoundException('Club not found');
    }

    const socio = club.socios.find(socio => socio.id === socioId);
    if (!socio) {
      throw new NotFoundException('Socio not found in this club');
    }

    return socio;
  }

  async updateMembersFromClub(clubId: number, socioIds: number[]): Promise<void> {
    const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
    if (!club) {
      throw new NotFoundException('Club not found');
    }

    const socios = await this.socioRepository.findByIds(socioIds);
    club.socios = socios;
    await this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: number, socioId: number): Promise<void> {
    const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ['socios'] });
    if (!club) {
      throw new NotFoundException('Club not found');
    }

    club.socios = club.socios.filter(socio => socio.id !== socioId);
    await this.clubRepository.save(club);
  }
}
