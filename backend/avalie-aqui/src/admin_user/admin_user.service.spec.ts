import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from './admin_user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AdminUser, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterAdminUserDto } from './dto';

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

    it('should register a new admin user', async () => {
      // Arrange
      const registerAdminUserDto: RegisterAdminUserDto = {
        name: 'João Borges',
        email: 'joaoborges@gmail.com',
        password: 'senha123',
      };
      const hashedPassword = 'hashedPassword';
      const createdAdminUser: AdminUser = {
        id: 1,
        name: 'João Borges',
        email: 'joaoborges@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(adminUserService, 'emailExists').mockResolvedValue(false);
      //@ts-ignore
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(prisma.adminUser, 'create').mockResolvedValue(createdAdminUser);

      // Act
      const result = await adminUserService.register(registerAdminUserDto);

      // Assert
      expect(adminUserService.emailExists).toHaveBeenCalledWith(registerAdminUserDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(registerAdminUserDto.password, 10);
      expect(prisma.adminUser.create).toHaveBeenCalledWith({
        data: {
          name: registerAdminUserDto.name,
          email: registerAdminUserDto.email,
          password: hashedPassword,
        },
        select: { id: true },
      });
      expect(result).toEqual(createdAdminUser);
    });

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
