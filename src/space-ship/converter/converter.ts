import { Injectable } from '@nestjs/common';
import { SpaceShip } from '../space-ship';
import { SpaceShipEntity } from '../space-ship.entity';
import { SpaceShipId } from '../SpaceShipId';

@Injectable()
export class Converter {
  toEntity(spaceShip: SpaceShip): SpaceShipEntity {
    return {
      isFasterThanLight: spaceShip.isFasterThanLight,
      spaceShipId: spaceShip.spaceShipId.value(),
      spaceShipName: spaceShip.spaceShipName,
      spaceShipNumber: spaceShip.spaceShipNumber,
    };
  }

  fromEntity(spaceShip: SpaceShipEntity): SpaceShip {
    return {
      isFasterThanLight: spaceShip.isFasterThanLight,
      spaceShipId: SpaceShipId.from(spaceShip.spaceShipId),
      spaceShipName: spaceShip.spaceShipName,
      spaceShipNumber: spaceShip.spaceShipNumber,
    };
  }
}
