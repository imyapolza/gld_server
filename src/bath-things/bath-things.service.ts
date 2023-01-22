import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBathThingsDto } from './dto/create-bath-things.dto';
import { UpdateBathThingsDto } from './dto/update-bath-things.dto';
import { UpdatePriceBathThingsDto } from './dto/updatePrice-bath-things.dto';
import { BathThings } from './entities/bath-things.entity';

@Injectable()
export class BathThingsService {
  constructor(
    @InjectRepository(BathThings)
    private repository: Repository<BathThings>,
  ) {}

  async create({
    name,
    characteristics,
    picturePath,
    price,
    query,
  }: CreateBathThingsDto) {
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

  async update(id: number, dto: UpdateBathThingsDto) {
    const find = await this.repository.findOne({ where: { id: id } });

    if (!find) {
      throw new NotFoundException('Арка не найдена');
    }

    await this.repository.update(id, {
      picturePath: dto.picturePath,
      name: dto.name,
      price: dto.price,
      characteristics: dto.characteristics,
    });

    return dto;
  }

  async updatePrice(id: number, dto: UpdatePriceBathThingsDto) {
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
