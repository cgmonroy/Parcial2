import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';
import { ClubMemberService } from './club-miembro.service';
import { ClubMemberController } from './club-miembro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Socio])],
  providers: [ClubMemberService],
  controllers: [ClubMemberController],
  exports: [TypeOrmModule],
})
export class ClubMemberModule {}
