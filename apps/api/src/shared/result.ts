export class Result<T> {
  protected constructor(
    private readonly _isSuccess: boolean,
    private readonly _error: T | string,
    private readonly _value?: T
  ) {
    if (_isSuccess && _error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!_isSuccess && !_error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    Object.freeze(this);
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get error(): T | string {
    return this._error;
  }

  public get value(): T {
    if (!this.isSuccess) {
      return this.error as T;
    }
    return this._value;
  }

  public getValue(): T {
    return this.value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string | U): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    const errors = results.filter((r) => r.isFailure).map((r) => r.error);
    if (errors.length > 0) {
      return Result.fail(errors.join('\n'));
    }
    return Result.ok('Combined results succeeded');
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  constructor(private readonly _value: L) {
    Object.freeze(this);
  }

  public get value(): L {
    return this._value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  constructor(private readonly _value: A) {
    Object.freeze(this);
  }

  public get value(): A {
    return this._value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
