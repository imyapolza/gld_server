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
} from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService, FileType } from 'src/file/file.service';

@Controller('entrance')
export class EntranceController {
  constructor(
    private readonly entranceService: EntranceService,
    private fileServise: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('file', {}))
  @Post('file')
  uploadFile(
    @Body() body: CreateEntranceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const picturePath = this.fileServise.createFile(FileType.ENTRANCE, file);

    return this.entranceService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
    });
  }

  @Get()
  findAll() {
    return this.entranceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entranceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntranceDto: UpdateEntranceDto,
  ) {
    return this.entranceService.update(+id, updateEntranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entranceService.remove(+id);
  }
}
