import { Module } from '@nestjs/common';
import { EntranceService } from './entrance.service';
import { EntranceController } from './entrance.controller';
import { FileService } from 'src/file/file.service';
import { Entrance } from './entities/entrance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entrance])],
  controllers: [EntranceController],
  providers: [EntranceService, FileService],
})
export class EntranceModule {}
