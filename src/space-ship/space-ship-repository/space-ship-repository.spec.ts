import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipRepository } from './space-ship-repository';
import { SpaceShipEntity } from '../space-ship.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SpaceShipRepository', () => {
  let provider: SpaceShipRepository;
  let entity: Repository<SpaceShipEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [SpaceShipEntity],
          synchronize: true,
          autoLoadEntities: true,
          keepConnectionAlive: false,
        }),
        TypeOrmModule.forFeature([SpaceShipEntity]),
      ],
      providers: [SpaceShipRepository],
    }).compile();

    provider = module.get<SpaceShipRepository>(SpaceShipRepository);
    entity = module.get(getRepositoryToken(SpaceShipEntity));
  });

  afterEach(async () => {
    await entity.manager.connection.destroy();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('it should save an entity', async () => {
    const spaceShipEntity: SpaceShipEntity = {
      isFasterThanLight: false,
      spaceShipName: 'some ship',
      spaceShipNumber: 0,
      spaceShipId: 'abc-000-ship',
    };

    const savedSpaceShip = await provider.save(spaceShipEntity);
    expect(savedSpaceShip).toBe(spaceShipEntity);
    expect(savedSpaceShip.dateCreated).toBeTruthy();
    const count = await entity.query(
      'select count(id) as rows from space_ship',
    );

    expect(count[0].rows).toBe(1);
  });
});
