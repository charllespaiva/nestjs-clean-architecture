import { Injectable } from '@nestjs/common';
import { UseCase } from '../gateways/UseCase';
import { sign } from 'jsonwebtoken';

@Injectable()
export class GenerateTokenUseCase implements UseCase {
  async execute(userId: string) {
    const token = sign({}, process.env.JWT_SECRET, {
      subject: userId,
      expiresIn: '86400s',
    });

    return token;
  }
}
