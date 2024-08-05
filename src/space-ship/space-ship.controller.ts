import { Body, Controller, Post } from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { SpaceShip } from './space-ship';
import { SpaceShipSaveRequestToSpaceShipPipe } from './validations/space-ship-save-request-to-space-ship.pipe';

@Controller('space-ship')
export class SpaceShipController {
  constructor(private service: SpaceShipService) {}

  @Post()
  save(@Body(new SpaceShipSaveRequestToSpaceShipPipe()) spaceShip: SpaceShip) {
    return this.service.save(spaceShip);
  }
}
