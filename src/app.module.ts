import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioModule } from './socio/socio.module';
import { ClubModule } from './club/club.module';
import { ClubMemberService } from './club-miembro/club-miembro.service';
import { ClubMemberModule } from './club-miembro/club-miembro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'BaltoTeAmo2024!',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SocioModule,
    ClubModule,
    ClubMemberModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClubMemberService],
})
export class AppModule {}

