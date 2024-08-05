import { SpaceShipSaveRequestToSpaceShipPipe } from './space-ship-save-request-to-space-ship.pipe';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShip } from '../space-ship';
import { SpaceShipId } from '../SpaceShipId';
import { SaveSpaceShipRequest } from '../space-ship.create.dto';

describe('SpaceShipSaveRequestToSpaceShipPipe', () => {
  let transformer: SpaceShipSaveRequestToSpaceShipPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipSaveRequestToSpaceShipPipe],
    }).compile();
    transformer = module.get<SpaceShipSaveRequestToSpaceShipPipe>(
      SpaceShipSaveRequestToSpaceShipPipe,
    );
  });

  it('should be defined', () => {
    expect(transformer).toBeDefined();
  });

  it('should throw error if body is empty', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const response = () => transformer.transform({}, {});
    expect(response).toThrow(BadRequestException);
  });

  it('should convert to valid Space Ship', () => {
    const spaceShipRequest: SaveSpaceShipRequest = {
      spaceShipId: 'abc-123-ship',
      spaceShipName: 'Star Harvester',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    };

    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from(spaceShipRequest.spaceShipId),
      spaceShipName: 'Star Harvester',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const parsedSpaceShip = transformer.transform(spaceShipRequest, {});

    expect(parsedSpaceShip).toEqual(spaceShip);
  });
});
