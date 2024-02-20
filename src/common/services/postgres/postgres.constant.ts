import { PoolClient } from 'pg';
export interface ExecuteQueryResult<T> {
  rows: T[];
  rowCount: number;
}
export interface IActionTransaction {
  queryFile: <T>(filePath: string, params: any[], client: PoolClient) => Promise<ExecuteQueryResult<T>>;
  query: <T>(query: string, params: any[], client: PoolClient) => Promise<ExecuteQueryResult<T>>;
}
