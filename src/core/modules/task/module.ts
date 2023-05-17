import { Module } from '@nestjs/common';
import { TaskController } from '@app/controllers/task.controller';
import { CreateTaskUseCase } from './useCases/CreateTaskUseCase';
import { TaskGateway } from './gateways/TaskGateway';
import { FindTaskByIdUseCase } from './useCases/FindByIdUseCase';
import { TaskPrismaAdapter } from '@app/adapters/task/TaskPrismaAdapter';
import { LoggerGateway } from '@core/dependencies/loggerGateway';
import { SignaleLoggerAdapter } from '@app/adapters/logger/SignaleLoggerAdapter';
import { UpdateTaskUseCase } from './useCases/UpdateTaskUseCase';
import { FindTaskByUserIdUseCase } from './useCases/FindByUserIdUseCase';
import { DeleteTaskUseCase } from './useCases/DeleteUseCase';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    FindTaskByIdUseCase,
    FindTaskByUserIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: TaskGateway,
      useClass: TaskPrismaAdapter,
    },
    {
      provide: LoggerGateway,
      useClass: SignaleLoggerAdapter,
    },
  ],
  exports: [TaskGateway],
})
export class TaskModule {}
