import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(@Res() response): string {
    return response.status(200).send({ version: 1 });
  }
}
