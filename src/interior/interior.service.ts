import { Injectable } from '@nestjs/common';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';

@Injectable()
export class InteriorService {
  create(createInteriorDto: CreateInteriorDto) {
    return 'This action adds a new interior';
  }

  findAll() {
    return `This action returns all interior`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interior`;
  }

  update(id: number, updateInteriorDto: UpdateInteriorDto) {
    return `This action updates a #${id} interior`;
  }

  remove(id: number) {
    return `This action removes a #${id} interior`;
  }
}
