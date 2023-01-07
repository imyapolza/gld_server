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
  Req,
} from '@nestjs/common';
import { InteriorService } from './interior.service';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { SampleDto } from './dto/sample.dto';

@Controller('interior')
export class InteriorController {
  constructor(private readonly interiorService: InteriorService) {}

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
  //   console.log('body', body);
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // create(@Req() req: any) {
  //   console.log('req', req);
  // }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    return {
      body,
      file: file.buffer.toString(),
    };
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
