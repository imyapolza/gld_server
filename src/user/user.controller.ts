import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() dto: CreateUserDto) {
  //   return this.userService.create(dto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch('me')
  // update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+req.user.id, updateUserDto);
  // }

  // @Get('search')
  // search(@Query() dto: SearchUserDto) {
  //   return this.userService.search(dto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findById(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
