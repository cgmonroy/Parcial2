import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioService } from './socio.service';
import { SocioController } from './socio.controller';
import { Socio } from './entities/socio.entity';
import { Club } from '../club/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Socio, Club])],
  controllers: [SocioController],
  providers: [SocioService],
})
export class SocioModule {}
