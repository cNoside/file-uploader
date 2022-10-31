import { isEqual } from 'lodash';

export abstract class ValueObject<T extends Record<string, any>> {
  protected readonly props: T;
  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === null || vo.props === undefined) {
      return false;
    }

    return isEqual(this.props, vo.props);
  }
}
