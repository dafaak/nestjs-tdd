import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipRepository } from './space-ship-repository/space-ship-repository';
import { SpaceShip } from './space-ship';
import { SpaceShipId } from './SpaceShipId';
import { SpaceShipEntity } from './space-ship.entity';
import { Converter } from './converter/converter';
jest.mock('./space-ship-repository/space-ship-repository');

describe('SpaceShipService', () => {
  let service: SpaceShipService;
  let repository: SpaceShipRepository;
  let converter: Converter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipService, SpaceShipRepository, Converter],
    }).compile();

    service = module.get<SpaceShipService>(SpaceShipService);
    repository = module.get<SpaceShipRepository>(SpaceShipRepository);
    converter = module.get<Converter>(Converter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save', () => {
    const spaceShip: SpaceShip = {
      isFasterThanLight: false,
      spaceShipId: SpaceShipId.from('abc-000-ship'),
      spaceShipName: 'sapceship',
      spaceShipNumber: 0,
    };

    const spaceShipEntity: SpaceShipEntity = {
      isFasterThanLight: false,
      spaceShipId: spaceShip.spaceShipId.value(),
      spaceShipName: 'sapceship',
      spaceShipNumber: 0,
    };

    const convertedSpaceShip: SpaceShip = {
      isFasterThanLight: false,
      spaceShipId: SpaceShipId.from('abc-000-ship'),
      spaceShipName: 'sapceship',
      spaceShipNumber: 0,
    };

    converter.toEntity = jest.fn().mockReturnValue(spaceShipEntity);
    repository.save = jest.fn().mockResolvedValue(spaceShipEntity);
    converter.fromEntity = jest.fn().mockReturnValue(convertedSpaceShip);

    return service.save(spaceShip).then((returndSpaceShip: any) => {
      expect(converter.toEntity).toHaveBeenCalledWith(spaceShip);
      expect(repository.save).toHaveBeenCalledWith(spaceShipEntity);
      expect(converter.fromEntity).toHaveBeenCalledWith(spaceShipEntity);
      expect(returndSpaceShip).toBe(convertedSpaceShip);
    });
  });
});
