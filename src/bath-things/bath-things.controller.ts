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
import { BathThingsService } from './bath-things.service';
import { CreateBathThingsDto } from './dto/create-bath-things.dto';
import { UpdateBathThingsDto } from './dto/update-bath-things.dto';
import { UpdatePriceBathThingsDto } from './dto/updatePrice-bath-things.dto';

@Controller('bath-things')
export class BathThingsController {
  constructor(
    private readonly bathThingsService: BathThingsService,
    private fileServise: FileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {}))
  @Post('file')
  uploadFile(
    @Body() body: CreateBathThingsDto,
    @UploadedFile() file: Express.Multer.File,
    @Query() query,
  ) {
    const picturePath = this.fileServise.createFile(FileType.ENTRANCE, file);

    return this.bathThingsService.create({
      picturePath,
      name: body.name,
      characteristics: body.characteristics,
      price: body.price,
      query,
    });
  }

  @Get()
  async findAll(@Query() query) {
    return await this.bathThingsService.findAll({
      limit: query.hasOwnProperty('limit') ? query.limit : 8,
      page: query.hasOwnProperty('page') ? query.page : 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bathThingsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdateBathThingsDto) {
    return this.bathThingsService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('price/:id')
  updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceBathThingsDto,
  ) {
    return this.bathThingsService.updatePrice(+id, updatePriceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Query() query) {
    return this.bathThingsService.remove({ id: +id, query });
  }
}
