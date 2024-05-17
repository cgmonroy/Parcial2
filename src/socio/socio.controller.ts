import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocioService } from './socio.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Controller('socios')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  create(@Body() createSocioDto: CreateSocioDto) {
    return this.socioService.create(createSocioDto);
  }

  @Get()
  findAll() {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.socioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSocioDto: UpdateSocioDto) {
    return this.socioService.update(id, updateSocioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.socioService.delete(id);
  }
}
