export interface ISagaResponse<T> {
  status: number;
  data: T;
}

export interface IFilter {
  height?: number;
  age?: number;
}

export interface ISortFilter {
  sort?: string;
  filter?: IFilter;
}