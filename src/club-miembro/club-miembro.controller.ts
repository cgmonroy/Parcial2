import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ClubMemberService } from './club-miembro.service';
import { Socio } from '../socio/entities/socio.entity';

@Controller('clubs/:clubId/members')
export class ClubMemberController {
  constructor(private readonly clubMemberService: ClubMemberService) {}

  @Post(':socioId')
  async addMemberToClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number): Promise<void> {
    return this.clubMemberService.addMemberToClub(clubId, socioId);
  }

  @Get()
  async findMembersFromClub(@Param('clubId') clubId: number): Promise<Socio[]> {
    return this.clubMemberService.findMembersFromClub(clubId);
  }

  @Get(':socioId')
  async findMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number): Promise<Socio> {
    return this.clubMemberService.findMemberFromClub(clubId, socioId);
  }

  @Put()
  async updateMembersFromClub(@Param('clubId') clubId: number, @Body() socioIds: number[]): Promise<void> {
    return this.clubMemberService.updateMembersFromClub(clubId, socioIds);
  }

  @Delete(':socioId')
  async deleteMemberFromClub(@Param('clubId') clubId: number, @Param('socioId') socioId: number): Promise<void> {
    return this.clubMemberService.deleteMemberFromClub(clubId, socioId);
  }
}
