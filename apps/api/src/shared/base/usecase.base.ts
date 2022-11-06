export abstract class UseCase<TRequest, TResponse> {
  public abstract execute(request: TRequest): TResponse | Promise<TResponse>;
}
