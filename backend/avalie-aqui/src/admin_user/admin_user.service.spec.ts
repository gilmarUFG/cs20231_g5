import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin_user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserService, 
        { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
