import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  static adminUser: any;
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        }
      }
    });
  }
}
