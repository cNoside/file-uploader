export interface IRepository<T> {
  delete(entity: T): Promise<boolean>;
  save(entity: T): Promise<boolean>;
}

export abstract class Repository {}
