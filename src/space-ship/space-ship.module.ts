import { Module } from '@nestjs/common';
import { SpaceShipController } from './space-ship.controller';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipRepository } from './space-ship-repository/space-ship-repository';
import { Converter } from './converter/converter';
import { SpaceShipEntity } from './space-ship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceShipEntity])],
  controllers: [SpaceShipController],
  providers: [SpaceShipService, SpaceShipRepository, Converter],
})
export class SpaceShipModule {}
