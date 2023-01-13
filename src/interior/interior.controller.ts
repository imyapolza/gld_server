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
  Query,
} from '@nestjs/common';
import { InteriorService } from './interior.service';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileService, FileType } from 'src/file/file.service';
import { UpdatePriceInteriorDto } from './dto/updatePrice-interior.dto';

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
    @Query() query,
  ) {
    const picturePath = this.fileServise.createFile(FileType.INTERIOR, file);

    return this.interiorService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
      query,
    });
  }

  @Get()
  async findAll(@Query() query) {
    return await this.interiorService.findAll({
      limit: query.hasOwnProperty('limit') ? query.limit : 8,
      page: query.hasOwnProperty('page') ? query.page : 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interiorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdateInteriorDto) {
    return this.interiorService.update(+id, updatePostDto);
  }

  @Patch('price/:id')
  updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceInteriorDto,
  ) {
    return this.interiorService.updatePrice(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() query) {
    return this.interiorService.remove({ id: +id, query });
  }
}
