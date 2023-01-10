import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('characteristicscharacteristics', characteristics);
    await this.repository.save({
      picturePath,
      name,
      price,
      characteristics,
    });

    return this.findAll();
  }

  async findAll() {
    const arr = await this.repository.createQueryBuilder('u').getMany();

    return arr;
  }

  async findOne(id: number) {
    const interior = await this.repository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();

    return interior;
  }

  update(id: number, updateInteriorDto: UpdateInteriorDto) {
    return `This action updates a #${id} interior`;
  }

  async remove(id: number) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Карточка не найдена');
    }

    await this.repository.delete(id);

    return this.findAll();
  }
}
