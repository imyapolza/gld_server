import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  findAll() {
    return this.homeService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(updateHomeDto);
  }
}
