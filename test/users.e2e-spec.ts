import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Pool, PoolClient } from 'pg';
import { externals } from '../src/common/services/postgres/postgres.service';

describe('Users Module (e2e)', () => {
  // let poolMock: Pool;
  let clientMock: PoolClient;
  let app: INestApplication;

  beforeEach(() => {
    console.log = jest.fn();

    jest.restoreAllMocks();

    clientMock = {
      query: jest.fn(),
      release: jest.fn(),
      connect: jest.fn(),
      copyFrom: jest.fn(),
      copyTo: jest.fn(),
      pauseDrain: jest.fn(),
      resumeDrain: jest.fn(),
      escapeIdentifier: jest.fn(),
      escapeLiteral: jest.fn(),
      on: jest.fn(),
      addListener: jest.fn(),
      once: jest.fn(),
      removeListener: jest.fn(),
      off: jest.fn(),
      removeAllListeners: jest.fn(),
      setMaxListeners: jest.fn(),
      getMaxListeners: jest.fn(),
      listeners: jest.fn(),
      rawListeners: jest.fn(),
      emit: jest.fn(),
      listenerCount: jest.fn(),
      prependListener: jest.fn(),
      prependOnceListener: jest.fn(),
      eventNames: jest.fn(),
    } as jest.Mocked<PoolClient>;

    jest.spyOn(Pool.prototype, 'connect').mockResolvedValue(clientMock);
    jest.spyOn(Pool.prototype, 'end').mockResolvedValue(undefined);

    jest.spyOn(externals, 'readFileSync').mockReturnValue('sql string');
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('GET /users', () => {
    const mockResponse = {
      rows: [
        {
          id: 1,
        },
      ],
      rowCount: 1,
    };
    (clientMock.query as jest.Mock).mockResolvedValueOnce(mockResponse);
    return request(app.getHttpServer())
      .get('/users')
      .expect(200, mockResponse)
      .then(() => {
        expect(clientMock.query).toHaveBeenCalledWith('sql string', []);
      });
  });
});
