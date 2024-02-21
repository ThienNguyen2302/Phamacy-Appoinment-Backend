// postgres.service.ts
import { BadRequestException, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Pool, PoolClient, PoolConfig, QueryResult } from 'pg';
import { MyLogger } from '../logger/logger.service';
import { ExecuteQueryResult } from './postgres.constant';

export const externals = {
  readFileSync: fs.readFileSync,
};

@Injectable()
export class PostgresService implements OnModuleDestroy {
  private readonly pool: Pool;
  private readonly queryFilePath: string;

  constructor(
    private readonly logger: MyLogger,
    private configService: ConfigService,
  ) {
    this.queryFilePath = path.join(__dirname, `../../../assets/sql`);
    const databaseConfigDefault: PoolConfig = {
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_NAME'),
      port: this.configService.get<number>('DB_PORT'),
      keepAlive: true,
      ssl: { rejectUnauthorized: false },
    };

    this.pool = new Pool({
      ...databaseConfigDefault,
    });
  }

  async executeQuery<T>(query: string, params: any[] = []): Promise<ExecuteQueryResult<T>> {
    const client = (await this.pool.connect()) as PoolClient;
    try {
      const result: ExecuteQueryResult<T> = await this.query(query, params, client);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(`SQL Execute Failed: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async executeQueryFromFile<T>(filePath: string, params: any[] = []): Promise<ExecuteQueryResult<T>> {
    const client = (await this.pool.connect()) as PoolClient;
    try {
      // Đọc nội dung của tệp
      const currentPath = `${this.queryFilePath}${filePath}`;
      const query = fs.readFileSync(currentPath, 'utf-8');
      if (!query) {
        throw new BadRequestException(`Can't read contents file sql`);
      }

      // Gọi hàm executeQuery với nội dung của tệp và các tham số
      return await this.query<T>(query, params, client);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(`SQL Execute Failed: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async transaction(callback: (client: PoolClient) => Promise<any>): Promise<any> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(error.message);
      throw new BadRequestException(`Transaction Failed: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async query<T>(query: string, params: any[] = [], client: PoolClient): Promise<ExecuteQueryResult<T>> {
    try {
      const responeQuery: QueryResult<T> = await client.query<T>(query, params);
      return {
        rowCount: responeQuery.rowCount,
        rows: responeQuery.rows,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(`SQL Execute Failed: ${error.message}`);
    }
  }

  async transactionQueryFile<T>(
    filePath: string,
    params: any[] = [],
    client: PoolClient,
  ): Promise<ExecuteQueryResult<T>> {
    try {
      // Đọc nội dung của tệp
      const basePath = path.join(__dirname, `../../../assets/sql`);
      const currentPath = `${basePath}${filePath}`;
      const query = fs.readFileSync(currentPath, 'utf-8');
      if (!query) {
        throw new BadRequestException(`Can't read contents file sql`);
      }

      // Gọi hàm executeQuery với nội dung của tệp và các tham số
      return await this.query<T>(query, params, client);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(`SQL Execute Failed: ${error.message}`);
    }
  }

  // Đảm bảo đóng Pool khi không cần thiết
  async closePool(): Promise<void> {
    await this.pool.end();
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.closePool();
      this.logger.log('Database pool closed successfully.');
    } catch (error) {
      this.logger.error(`Error closing database pool: ${error.message}`);
    }
  }
}
