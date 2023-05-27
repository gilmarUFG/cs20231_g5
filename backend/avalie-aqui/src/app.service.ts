import { Injectable } from '@nestjs/common';
import { slugify } from './util/functions';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
