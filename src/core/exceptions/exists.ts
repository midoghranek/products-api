import { ConflictException } from '@nestjs/common';

export class Exists extends ConflictException {
  constructor(record: string) {
    super(`${record} already exists`);
  }
}
