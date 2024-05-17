import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from './entities/socio.entity';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private socioRepository: Repository<Socio>,
  ) {}

  //CRUD

  //FindAll
  findAll(): Promise<Socio[]> {
    return this.socioRepository.find({ relations: ['clubs'] });
  }

  //FindOne
  async findOne(id: number): Promise<Socio> {
    const socio = await this.socioRepository.findOne({ where: { id }, relations: ['clubs'] });
    if (!socio) {
      throw new NotFoundException(`No se encontro un socio con ID ${id}`);
    }
    return socio;
  }

  //Create
  async create(createSocioDto: CreateSocioDto): Promise<Socio> {
    if (!this.validacionEmail(createSocioDto.correoElectronico)) {
      throw new BadRequestException('Correo electrónico inválido, incluya el @');
    }
    const nuevoSocio = this.socioRepository.create(createSocioDto);
    return this.socioRepository.save(nuevoSocio);
  }

  //Update
  async update(id: number, updateSocioDto: UpdateSocioDto): Promise<Socio> {
    if (updateSocioDto.correoElectronico && !this.validacionEmail(updateSocioDto.correoElectronico)) {
      throw new BadRequestException('Correo electrónico inválido, incluya el @');
    }
    await this.socioRepository.update(id, updateSocioDto);
    const updatedSocio = await this.findOne(id);
    if (!updatedSocio) {
      throw new NotFoundException(`No se encontro un socio con ID ${id}`);
    }
    return updatedSocio;
  }

  //Delete
  async delete(id: number): Promise<void> {
    const result = await this.socioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontro un socio con ID ${id}`);
    }
  }

  //Logic
  private validacionEmail(email: string): boolean {
    return email.includes('@');
  }
}
