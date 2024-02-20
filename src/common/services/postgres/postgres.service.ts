// postgres.service.ts
import { BadRequestException, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as _path from 'path';
import { Pool, PoolClient, PoolConfig, QueryResult } from 'pg';
import { MyLogger } from '../logger/logger.service';
import { ExecuteQueryResult, IActionTransaction } from './postgres.constant';

export const externals = {
  readFileSync: fs.readFileSync,
};

@Injectable()
export class PostgresService implements OnModuleDestroy {
  private readonly pool: Pool;
  private readonly path = { ..._path };
  private readonly queryFilePath: string = this.path.join(__dirname, `../../../assets/sql`);

  constructor(
    private readonly logger: MyLogger,
    private configService: ConfigService,
  ) {
    const databaseConfigDefault: PoolConfig = {
      user: 'admin',
      password: 'PrnGm730n1O9iwHqNM4cbBXiBX9dprvo',
      host: 'dpg-cn9mvi779t8c73bcql50-a.singapore-postgres.render.com',
      database: 'phamacy_app',
      port: 5432,
      keepAlive: true,
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
      throw new BadRequestException('Query failed');
    } finally {
      client.release();
    }
  }

  async query<T>(query: string, params: any[] = [], client: PoolClient): Promise<ExecuteQueryResult<T>> {
    const responeQuery: QueryResult<T> = await client.query<T>(query, params);
    return {
      rowCount: responeQuery.rowCount,
      rows: responeQuery.rows,
    };
  }

  async transactionQueryFile<T>(
    filePath: string,
    params: any[] = [],
    client: PoolClient,
  ): Promise<ExecuteQueryResult<T>> {
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
      throw new BadRequestException('Query by file failed');
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
      throw new BadRequestException(`Query by file failed - ${error.message}`);
    } finally {
      client.release();
    }
  }

  async transaction(callback: (client: PoolClient, action: IActionTransaction) => Promise<any>): Promise<any> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client, { queryFile: this.transactionQueryFile, query: this.query });
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(error.message);
      throw new BadRequestException(`Transaction failed: ${error.message}`);
    } finally {
      client.release();
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
