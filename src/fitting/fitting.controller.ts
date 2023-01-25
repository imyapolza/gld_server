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
import { FittingService } from './fitting.service';
import { CreateFittingDto } from './dto/create-fitting.dto';
import { UpdateFittingDto } from './dto/update-fitting.dto';
import { FileService, FileType } from 'src/file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePriceFittingDto } from './dto/updatePrice-fitting.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('fitting')
export class FittingController {
  constructor(
    private readonly archesService: FittingService,
    private fileServise: FileService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {}))
  @Post('file')
  uploadFile(
    @Body() body: CreateFittingDto,
    @UploadedFile() file: Express.Multer.File,
    @Query() query,
  ) {
    const picturePath = this.fileServise.createFile(FileType.FITTING, file);

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
  update(@Param('id') id: string, @Body() updatePostDto: UpdateFittingDto) {
    return this.archesService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('price/:id')
  updatePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdatePriceFittingDto,
  ) {
    return this.archesService.updatePrice(+id, updatePriceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Query() query) {
    return this.archesService.remove({ id: +id, query });
  }
}
