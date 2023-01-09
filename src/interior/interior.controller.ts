import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { InteriorService } from './interior.service';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { FileService, FileType } from 'src/file/file.service';

@Controller('interior')
export class InteriorController {
  constructor(
    private readonly interiorService: InteriorService,
    private fileServise: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('file', {}))
  @Post('file')
  uploadFile(
    @Body() body: CreateInteriorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const picturePath = this.fileServise.createFile(FileType.INTERIOR, file);

    return this.interiorService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
    });
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
  update(
    @Param('id') id: string,
    @Body() updateInteriorDto: UpdateInteriorDto,
  ) {
    return this.interiorService.update(+id, updateInteriorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interiorService.remove(+id);
  }
}
