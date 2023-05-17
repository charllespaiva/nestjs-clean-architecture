export abstract class LoggerGateway {
  abstract Debug(msg: string, params?: any);
  abstract Info(msg: string, params?: any);
  abstract Warn(msg: string, params?: any);
  abstract Error(msg: string, err?: Error, params?: any);
  abstract Fatal(msg: string, err?: Error, params?: any);
}
