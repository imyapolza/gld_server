import { Module } from '@nestjs/common';
import { InteriorService } from './interior.service';
import { InteriorController } from './interior.controller';

@Module({
  controllers: [InteriorController],
  providers: [InteriorService]
})
export class InteriorModule {}
