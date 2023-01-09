import { Module } from '@nestjs/common';
import { InteriorService } from './interior.service';
import { InteriorController } from './interior.controller';
import { FileService } from 'src/file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interior } from './entities/interior.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interior])],
  controllers: [InteriorController],
  providers: [InteriorService, FileService],
})
export class InteriorModule {}
