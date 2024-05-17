import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Socio } from '../../socio/entities/socio.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fechaFundacion: Date;

  @Column()
  imagen: string;

  @Column({ length: 100 })
  descripcion: string;

  @ManyToMany(() => Socio, socio => socio.clubs)
  @JoinTable()
  socios: Socio[];
}
