import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { Club } from './entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Socio])],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [TypeOrmModule] 
})
export class ClubModule {}
