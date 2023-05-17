import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { Signale } from 'signale';

export class SignaleLoggerAdapter implements LoggerGateway {
  private readonly logger: Signale;
  constructor() {
    this.logger = new Signale();
  }

  Debug(msg: string, content: null) {
    this.logger.debug(msg, content);
  }
  Info(msg: string, params: any) {
    this.logger.note(msg, params ? params : {});
  }
  Warn(msg: string, content: null) {
    this.logger.warn(msg, content);
  }
  Error(msg: string, err: any, content: null) {
    this.logger.error(msg, err, content);
  }
  Fatal(msg: string, err: any, content: null) {
    this.logger.fatal(msg, err, content);
  }
}
