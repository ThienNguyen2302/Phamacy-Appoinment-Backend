export interface ExecuteQueryResult<T> {
  rows: T[];
  rowCount: number;
}
