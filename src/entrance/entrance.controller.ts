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
import { EntranceService } from './entrance.service';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService, FileType } from 'src/file/file.service';
import { UpdatePriceEntranceDto } from './dto/updatePrice-entrance.dto';

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
    @Query() query,
  ) {
    const picturePath = this.fileServise.createFile(FileType.ENTRANCE, file);

    return this.entranceService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
      query,
    });
  }

  @Get()
  async findAll(@Query() query) {
    return await this.entranceService.findAll({
      limit: query.hasOwnProperty('limit') ? query.limit : 8,
      page: query.hasOwnProperty('page') ? query.page : 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entranceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdateEntranceDto) {
    return this.entranceService.update(+id, updatePostDto);
  }

  @Patch('price/:id')
  updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceEntranceDto,
  ) {
    return this.entranceService.updatePrice(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() query) {
    return this.entranceService.remove({ id: +id, query });
  }
}
