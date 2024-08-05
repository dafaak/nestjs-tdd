import { SpaceShipId } from './SpaceShipId';

describe('SpaceShipId', () => {
  it('should throw error when id is not valid', () => {
    const id = 'should-fail';
    const spaceShipId = () => SpaceShipId.from(id);
    expect(spaceShipId).toThrow(Error);
  });

  it('should create SapceShipId when id is valid', () => {
    const id = 's-ship-00001';
    expect(SpaceShipId.from(id)).toBeTruthy();
  });
});
