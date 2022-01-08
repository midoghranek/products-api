import { UnauthorizedException } from '@nestjs/common';

export class WrongPassword extends UnauthorizedException {
  constructor(record: string) {
    super(`Wrong password for ${record}`);
  }
}
