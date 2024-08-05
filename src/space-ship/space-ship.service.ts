import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SpaceShip } from './space-ship';
import { SpaceShipRepository } from './space-ship-repository/space-ship-repository';
import { Converter } from './converter/converter';
import { SpaceShipEntity } from './space-ship.entity';

@Injectable()
export class SpaceShipService {
  constructor(
    private repository: SpaceShipRepository,
    private converter: Converter,
  ) {}

  save(spaceShip: SpaceShip): Promise<SpaceShip> {
    const spaceShipentity = this.converter.toEntity(spaceShip);
    return this.repository
      .save(spaceShipentity)
      .then((spaceShipEntity: SpaceShipEntity) => {
        return this.converter.fromEntity(spaceShipEntity);
      })
      .catch(() => {
        throw new UnprocessableEntityException('Could not save');
      });
  }
}
