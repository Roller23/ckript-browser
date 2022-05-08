export class ErrorHandler {
  public static throwError(cause: string): void {
    throw new Error(cause);
  }
}