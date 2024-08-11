import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipController } from './space-ship.controller';
import { SpaceShipService } from './space-ship.service';
import { SpaceShip } from './space-ship';
import { SpaceShipId } from './SpaceShipId';

jest.mock('./space-ship.service');

describe('SpaceShipController', () => {
  let controller: SpaceShipController;
  let service: SpaceShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceShipController],
      providers: [SpaceShipService],
    }).compile();

    controller = module.get<SpaceShipController>(SpaceShipController);
    service = module.get<SpaceShipService>(SpaceShipService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service', () => {
    const spaceShip: SpaceShip = {
      isFasterThanLight: true,
      spaceShipId: SpaceShipId.from('space-ship-1'),
      spaceShipName: 'death-star',
      spaceShipNumber: 1,
    };
    const returnedSpaceShip: SpaceShip = {
      isFasterThanLight: true,
      spaceShipId: SpaceShipId.from('space-ship-1'),
      spaceShipName: 'death-star',
      spaceShipNumber: 1,
    };
    service.save = jest.fn().mockResolvedValue(returnedSpaceShip);

    return controller.save(spaceShip).then((resolvedSpaceShip) => {
      expect(service.save).toHaveBeenCalledWith(spaceShip);
      expect(resolvedSpaceShip).toBe(returnedSpaceShip);
    });
  });
});
