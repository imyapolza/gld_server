import { Module } from '@nestjs/common';
import { FittingService } from './fitting.service';
import { FittingController } from './fitting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fitting } from './entities/fitting.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fitting])],
  controllers: [FittingController],
  providers: [FittingService, FileService],
})
export class FittingModule {}
