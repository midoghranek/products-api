import { NotFoundException } from '@nestjs/common';

export class NotFound extends NotFoundException {
  constructor(record: string) {
    super(`${record} not found`);
  }
}
