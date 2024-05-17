import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  //CRUD

  //FindAll
  findAll(): Promise<Club[]> {
    return this.clubRepository.find({ relations: ['socios'] });
  }

  //FindOne
  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepository.findOne({ where: { id }, relations: ['socios'] });
    if (!club) {
      throw new NotFoundException(`No se encontro un club con ID ${id}`);
    }
    return club;
  }

  //Create-Con restruccion de logica
  async create(createClubDto: CreateClubDto): Promise<Club> {
    if (createClubDto.descripcion.length > 100) {
      throw new BadRequestException('La descripción no puede tener mas de 100 caracteres');
    }
    const nuevoClub = this.clubRepository.create(createClubDto);
    return this.clubRepository.save(nuevoClub);
  }

  //Upsate-Con restruccion de logica
  async update(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    if (updateClubDto.descripcion && updateClubDto.descripcion.length > 100) {
      throw new BadRequestException('La descripción no puede tener mas de 100 caracteres');
    }
    await this.clubRepository.update(id, updateClubDto);
    const updatedClub = await this.findOne(id);
    if (!updatedClub) {
      throw new NotFoundException(`No se encontro un club con ID ${id}`);
    }
    return updatedClub;
  }

  //Delete
  async delete(id: number): Promise<void> {
    const result = await this.clubRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontro un club con ID ${id}`);
    }
  }
}
