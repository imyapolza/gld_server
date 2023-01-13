import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';
import { UpdatePriceEntranceDto } from './dto/updatePrice-entrance.dto';
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
    query,
  }: CreateEntranceDto) {
    await this.repository.save({
      picturePath,
      name,
      price,
      characteristics,
    });

    return this.findAll(query);
  }

  async findAll(options) {
    const [results, total] = await this.repository.findAndCount({
      take: options.limit,
      skip: options.page,
    });

    return {
      results,
      total,
    };
  }

  async findOne(id: number) {
    const interior = await this.repository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();

    return interior;
  }

  async update(id: number, dto: UpdateEntranceDto) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Межкомнатная дверь не найдена');
    }

    await this.repository.update(id, {
      picturePath: dto.picturePath,
      name: dto.name,
      price: dto.price,
      characteristics: dto.characteristics,
    });

    return dto;
  }

  async updatePrice(id: number, dto: UpdatePriceEntranceDto) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Межкомнатная дверь не найдена');
    }

    await this.repository.update(id, {
      price: dto.price,
    });

    return dto.price;
  }

  async remove({ id, query }) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Входная дверь не найдена');
    }

    await this.repository.delete(id);

    return this.findAll(query);
  }
}
