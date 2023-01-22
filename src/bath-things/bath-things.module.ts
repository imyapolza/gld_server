import { Module } from '@nestjs/common';
import { BathThingsService } from './bath-things.service';
import { BathThingsController } from './bath-things.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BathThings } from './entities/bath-things.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([BathThings])],
  controllers: [BathThingsController],
  providers: [BathThingsService, FileService],
})
export class BathThingsModule {}
