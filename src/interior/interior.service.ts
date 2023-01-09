import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInteriorDto } from './dto/create-interior.dto';
import { UpdateInteriorDto } from './dto/update-interior.dto';
import { Interior } from './entities/interior.entity';

@Injectable()
export class InteriorService {
  constructor(
    @InjectRepository(Interior)
    private repository: Repository<Interior>,
  ) {}

  async create({
    name,
    characteristics,
    picturePath,
    price,
  }: CreateInteriorDto) {
    await this.repository.save({
      picturePath,
      name,
      price,
      characteristics,
    });
  }

  async findAll() {
    const arr = await this.repository.createQueryBuilder('u').getMany();

    return arr;
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
