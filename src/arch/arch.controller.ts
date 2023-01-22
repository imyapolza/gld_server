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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileService, FileType } from 'src/file/file.service';
import { ArchesService } from './arch.service';
import { CreateArchesDto } from './dto/create-arch.dto';
import { UpdateArchesDto } from './dto/update-arch.dto';
import { UpdatePriceArchesDto } from './dto/updatePrice-arch.dto';

@Controller('arch')
export class ArchesController {
  constructor(
    private readonly archesService: ArchesService,
    private fileServise: FileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {}))
  @Post('file')
  uploadFile(
    @Body() body: CreateArchesDto,
    @UploadedFile() file: Express.Multer.File,
    @Query() query,
  ) {
    const picturePath = this.fileServise.createFile(FileType.ENTRANCE, file);

    return this.archesService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
      query,
    });
  }

  @Get()
  async findAll(@Query() query) {
    return await this.archesService.findAll({
      limit: query.hasOwnProperty('limit') ? query.limit : 8,
      page: query.hasOwnProperty('page') ? query.page : 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdateArchesDto) {
    return this.archesService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('price/:id')
  updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceArchesDto,
  ) {
    return this.archesService.updatePrice(+id, updatePriceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Query() query) {
    return this.archesService.remove({ id: +id, query });
  }
}
