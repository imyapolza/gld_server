import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entities/home.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private repository: Repository<Home>,
  ) {}

  async create(createHomeDto: CreateHomeDto) {
    await this.repository.save({
      id: 1,
      address: createHomeDto.address,
      number: createHomeDto.number,
    });

    return createHomeDto;
  }

  async update(updateHomeDto: UpdateHomeDto) {
    await this.repository.update(1, {
      address: updateHomeDto.address,
      number: updateHomeDto.number,
    });

    const all = await this.getAll();

    return all;
  }

  async getAll() {
    const arr = await this.repository.createQueryBuilder('u').getMany();

    return arr[0];
  }
}
