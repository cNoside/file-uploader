export interface IRepository<T> {
  delete(entity: T): Promise<any>;
  save(entity: T): Promise<any>;
}

export abstract class Repository {}
