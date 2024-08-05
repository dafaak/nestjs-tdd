export class SpaceShipId {
  private readonly id: string;

  static from(id: string): SpaceShipId {
    return new SpaceShipId(id);
  }

  constructor(id: string) {
    SpaceShipId.validate(id);
    this.id = id;
  }

  private static validate(id: string) {
    const isValid = id && id.length === 12;
    if (!isValid) throw new Error('Invalid Space Ship id');
  }

  value(): string {
    return this.id;
  }
}
