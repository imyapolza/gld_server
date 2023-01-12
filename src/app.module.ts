import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InteriorModule } from './interior/interior.module';
import * as path from 'path';
import { Interior } from './interior/entities/interior.entity';
import { EntranceModule } from './entrance/entrance.module';
import { Entrance } from './entrance/entities/entrance.entity';
import { HomeModule } from './home/home.module';
import { Home } from './home/entities/home.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    InteriorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'gld',
      entities: [Interior, Entrance, Home],
      synchronize: true,
    }),
    EntranceModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
