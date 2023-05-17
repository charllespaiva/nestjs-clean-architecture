import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TaskModule } from './core/modules/task/module';
import { UserModule } from '@core/modules/user/module';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
