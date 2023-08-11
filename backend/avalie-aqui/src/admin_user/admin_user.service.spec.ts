import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin_user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdminUser, PrismaClient } from '@prisma/client';

describe('AdminUserService', () => {
  let adminUserService: AdminUserService;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    adminUserService = new AdminUserService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(adminUserService).toBeDefined();
  });

  describe('register', () => {

    it('should throw an error if email already exists', async () => {
      // Mock do objeto registerAdminUserDto
      const registerAdminUserDto = {
        name: 'João Borges',
        email: 'joaoborges@gmail.com',
        password: 'senha123',
      };

      // Mock do método emailExists para retornar verdadeiro
      jest.spyOn(adminUserService, 'emailExists').mockResolvedValue(true);

      // Chamar o método register e verificar se ele lança um erro
      await expect(adminUserService.register(registerAdminUserDto)).rejects.toThrowError('O Email especificado já está em uso.');

      // Verificar se o método emailExists foi chamado corretamente
      expect(adminUserService.emailExists).toHaveBeenCalledWith(registerAdminUserDto.email);
    });
  });

  describe('getAdmin', () => {
    it('should return admin user by ID', async () => {
      // Mock do objeto admin
      const admin: AdminUser = {
        id: 1,
        name: 'João Borges',
        email: 'joaoborges@gmail.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock do objeto req
      const req = {
        user: admin,
      };

      // Mock do método prisma.adminUser.findUnique para retornar o admin simulado
      jest.spyOn(prisma.adminUser, 'findUnique').mockResolvedValue(admin);

      // Chamar o método getAdmin e verificar se ele retorna o admin simulado
      const result = await adminUserService.getAdmin(req);

      // Verificar se o método prisma.adminUser.findUnique foi chamado corretamente
      expect(prisma.adminUser.findUnique).toHaveBeenCalledWith({
        where: {
          id: admin.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      // Verificar se o resultado retornado é o admin simulado
      expect(result).toEqual(admin);
    });
  });
});
