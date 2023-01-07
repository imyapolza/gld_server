import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteriorService } from './interior.service';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';

@Controller('interior')
export class InteriorController {
  constructor(private readonly interiorService: InteriorService) {}

  @Post()
  create(@Body() createInteriorDto: CreateInteriorDto) {
    return this.interiorService.create(createInteriorDto);
  }

  @Get()
  findAll() {
    return this.interiorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interiorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteriorDto: UpdateInteriorDto) {
    return this.interiorService.update(+id, updateInteriorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interiorService.remove(+id);
  }
}
