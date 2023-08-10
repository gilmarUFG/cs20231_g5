import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

const prismaServiceMock = {
  user: {
    create: jest.fn((data) =>
      Promise.resolve({
        id: 1,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
      }),
    ),
    findUnique: jest.fn((data) => {
      if (data.where.email === 'usuario@avalieaqui.com') {
        return Promise.resolve({
          id: 2,
          name: 'Usuario Existente',
          email: 'usuario@avalieaqui.com',
          cpf: '26601201103',
        });
      } else if (data.where.id === 1) {
        return Promise.resolve({
          id: 1,
          name: 'Jhon Doe',
          email: 'jhondoe@avalieaqui.com.br',
          cpf: '94464802133',
        });
      }
      return Promise.resolve(null);
    }),
    update: jest.fn((where, data) =>
      Promise.resolve({ id: where.id, ...data }),
    ),
  },
};

const registerUserDto = {
  name: 'Jhon Doe',
  email: 'jhondoe@avalieaqui.com.br',
  cpf: '944.648.021-33',
  password: '123456a',
};

const updateUserDto: UpdateUserDto = {
  name: 'Jane Doe',
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const result = await userService.register(registerUserDto);

      expect(result.id).toBeDefined();
      //@ts-ignore
      expect(result.message).toEqual('Usuário cadastrado com sucesso.');
    });

    it('should throw an error if email already exists', async () => {
      await expect(
        userService.register({
          ...registerUserDto,
          email: 'usuario@avalieaqui.com',
        }),
      ).rejects.toThrowError(
        new HttpException(
          'O Email especificado já está em uso.',
          HttpStatus.FORBIDDEN,
        ),
      );
    });

    it('should throw an error if cpf already exists', async () => {
      await expect(
        userService.register({ ...registerUserDto, cpf: '94464802133' }),
      ).rejects.toThrowError(
        new HttpException(
          'O CPF especificado já está em uso.',
          HttpStatus.FORBIDDEN,
        ),
      );
    });

    it('should throw an error if registration fails', async () => {
      prismaServiceMock.user.create.mockRejectedValueOnce(new Error());

      await expect(userService.register(registerUserDto)).rejects.toThrowError(
        new HttpException(
          'Falha ao cadastrar usuário. Tente novamente mais tarde.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getUser', () => {
    it('should get user data', async () => {
      const req = {
        user: { id: 1 },
      };
      const result = await userService.getUser(req);

      expect(result.id).toEqual(req.user.id);
      expect(result.name).toEqual('Jhon Doe');
      expect(result.email).toEqual('jhondoe@avalieaqui.com.br');
      expect(result.cpf).toEqual('94464802133');
    });
  });

  describe('update', () => {
    it('should update user data', async () => {
      const req = {
        user: { id: 1 },
      };
      const result = await userService.update(req, updateUserDto);

      expect(result).toEqual({ message: 'Usuário atualizado com sucesso.' });
    });

    it('should throw an error if update fails', async () => {
      const req = {
        user: { id: 1 },
      };
      prismaServiceMock.user.update.mockRejectedValueOnce(new Error());

      await expect(userService.update(req, updateUserDto)).rejects.toThrowError(
        new HttpException(
          'Falha ao atualizar dados do usuário. Tente novamente mais tarde.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
