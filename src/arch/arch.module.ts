import { Module } from '@nestjs/common';
import { ArchesService } from './arch.service';
import { ArchesController } from './arch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arches } from './entities/arch.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Arches])],
  controllers: [ArchesController],
  providers: [ArchesService, FileService],
})
export class ArchesModule {}
