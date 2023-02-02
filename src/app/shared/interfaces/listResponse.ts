export interface IListResponse<T extends { id: number }> {
  list: T[],
  totalCount: number;
}
