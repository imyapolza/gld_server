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
import { FittingModule } from './fitting/fitting.module';
import { ArchesModule } from './arch/arch.module';
import { BathThingsModule } from './bath-things/bath-things.module';
import { Arches } from './arch/entities/arch.entity';
import { Fitting } from './fitting/entities/fitting.entity';
import { BathThings } from './bath-things/entities/bath-things.entity';
import { UserEntity } from './user/entities/user.entity';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

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
      entities: [
        Interior,
        Entrance,
        Home,
        Arches,
        Fitting,
        BathThings,
        UserEntity,
      ],
      synchronize: true,
    }),
    EntranceModule,
    HomeModule,
    FittingModule,
    ArchesModule,
    BathThingsModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
