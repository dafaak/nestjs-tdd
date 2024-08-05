import { Test, TestingModule } from '@nestjs/testing';
import { Converter } from './converter';
import { SpaceShip } from '../space-ship';
import { SpaceShipId } from '../SpaceShipId';
import { SpaceShipEntity } from '../space-ship.entity';

describe('SpaceShipToEntity', () => {
  let provider: Converter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Converter],
    }).compile();

    provider = module.get<Converter>(Converter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should convert spaceShip into SpcaeShipEntity', () => {
    const spaceShip: SpaceShip = {
      isFasterThanLight: false,
      spaceShipId: SpaceShipId.from('abc-000-ship'),
      spaceShipName: 'the ship',
      spaceShipNumber: 0,
    };

    const spaceShipEntity: SpaceShipEntity = {
      isFasterThanLight: false,
      spaceShipId: 'abc-000-ship',
      spaceShipName: 'the ship',
      spaceShipNumber: 0,
    };

    const convertedEntity = provider.toEntity(spaceShip);

    expect(convertedEntity).toEqual(spaceShipEntity);
  });

  it('should convert SpcaeShipEntity into SpaceShip  ', () => {
    const spaceShip: SpaceShip = {
      isFasterThanLight: false,
      spaceShipId: SpaceShipId.from('abc-000-ship'),
      spaceShipName: 'the ship',
      spaceShipNumber: 0,
    };

    const spaceShipEntity: SpaceShipEntity = {
      isFasterThanLight: false,
      spaceShipId: 'abc-000-ship',
      spaceShipName: 'the ship',
      spaceShipNumber: 0,
    };

    const convertedEntity = provider.fromEntity(spaceShipEntity);

    expect(convertedEntity).toEqual(spaceShip);
  });
});
