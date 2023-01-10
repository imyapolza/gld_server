import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';
import { Entrance } from './entities/entrance.entity';

@Injectable()
export class EntranceService {
  constructor(
    @InjectRepository(Entrance)
    private repository: Repository<Entrance>,
  ) {}

  async create({
    name,
    characteristics,
    picturePath,
    price,
  }: CreateEntranceDto) {
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

  update(id: number, updateEntranceDto: UpdateEntranceDto) {
    return `This action updates a #${id} entrance`;
  }

  async remove(id: number) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Входная дверь не найдена');
    }

    await this.repository.delete(id);

    return this.findAll();
  }
}
