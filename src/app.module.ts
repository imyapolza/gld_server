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
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    InteriorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    EntranceModule,
    HomeModule,
    FittingModule,
    ArchesModule,
    BathThingsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
