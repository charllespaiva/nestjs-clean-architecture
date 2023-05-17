import { TaskPresenter } from '@app/presenters/TaskPresenter';
import { CreateTaskUseCase } from '@core/modules/task/useCases/CreateTaskUseCase';
import { DeleteTaskUseCase } from '@core/modules/task/useCases/DeleteUseCase';
import { FindTaskByIdUseCase } from '@core/modules/task/useCases/FindByIdUseCase';
import { FindTaskByUserIdUseCase } from '@core/modules/task/useCases/FindByUserIdUseCase';
import { UpdateTaskUseCase } from '@core/modules/task/useCases/UpdateTaskUseCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskBody, FindTaskBody } from './dtos/TaskDTO';
import { AuthGuard } from '@app/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    private createUseCase: CreateTaskUseCase,
    private findByIdUseCase: FindTaskByIdUseCase,
    private findByUserIdUseCase: FindTaskByUserIdUseCase,
    private updateUseCase: UpdateTaskUseCase,
    private deleteUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateTaskBody, @Res() response) {
    try {
      const task = await this.createUseCase.execute(body);

      if (!task) {
        return response.status(HttpStatus.BAD_REQUEST).send();
      }
      return response.send({
        data: TaskPresenter.toHTTP(task),
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async findById(@Param() params: FindTaskBody, @Res() response) {
    const task = await this.findByIdUseCase.execute({
      id: params.id,
    });

    if (!task) {
      return response.status(HttpStatus.NOT_FOUND).send({ task });
    }

    return response.send({
      data: TaskPresenter.toHTTP(task),
    });
  }

  @Get('user/:id')
  async findByUser(@Param() params: FindTaskBody, @Res() response) {
    const tasks = await this.findByUserIdUseCase.execute({
      userId: params.id,
    });

    if (!tasks) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.send({
      data: tasks.map((task) => TaskPresenter.toHTTP(task)),
    });
  }

  @Patch('/:id')
  async patch(@Param() params, @Body() body, @Res() response) {
    const task = await this.updateUseCase.execute({
      id: params.id,
      ...body,
    });

    return response.send({
      data: TaskPresenter.toHTTP(task),
    });
  }

  @Delete('/:id')
  async delete(@Param() params, @Res() response) {
    await this.deleteUseCase.execute(params);

    return response.status(HttpStatus.ACCEPTED).send();
  }
}
