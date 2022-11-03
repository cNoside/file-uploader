import { IDTO } from './dto.base';
import { IEntity } from './entity.base';

export abstract class Mapper<T, U extends IEntity, S extends IDTO> {
  public abstract toEntity(model: T): U;
  public abstract toDTO(model: T): S;
  public abstract toModel(entity: U): T;
}
