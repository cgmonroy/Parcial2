import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Club } from '../../club/entities/club.entity';

@Entity()
export class Socio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreUsuario: string;

  @Column()
  correoElectronico: string;

  @Column()
  fechaNacimiento: Date;

  @ManyToMany(() => Club, club => club.socios)
  clubs: Club[];
}
