import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';


const fakeProducts = [
  {
    id: 1,
    name: 'RTX 4060 Ti',
    category: 'placa-de-video',
    image_url: 'https://files.tecnoblog.net/wp-content/uploads/2023/05/geforce-rtx-4060-ti-back-1060x795.jpg',
    createdAt: new Date(2023, 7, 20),
    updatedAt: new Date(2023, 7, 21),
    reviews: []
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 5900X',
    category: 'processador',
    image_url: 'https://www.amd.com/system/files/2020-10/616607-amd-ryzen-9-5900x-pib-left-facing-1260x709_0.png',
    createdAt: new Date(2023, 7, 19),
    updatedAt: new Date(2023, 7, 21),
    reviews: []
  },
  {
    id: 3,
    name: 'Samsung Odyssey G9',
    category: 'monitor',
    image_url: 'https://images.samsung.com/is/image/samsung/br-gaming-monitor-g9-lc49g95tssgxzd-frontblack-227464741?$720_576_PNG$',
    createdAt: new Date(2023, 7, 18),
    updatedAt: new Date(2023, 7, 21),
    reviews: []
  },
  {
    id: 4,
    name: 'Corsair K95 RGB Platinum XT',
    category: 'teclado',
    image_url: 'https://www.corsair.com/medias/sys_master/images/images/hb2/hf3/9114393833502/-CH-9127414-NA-Gallery-K95-RGB-Platinum-XT-01.png',
    createdAt: new Date(2023, 7, 17),
    updatedAt: new Date(2023, 7, 21),
    reviews: []
  }
];

const fakeRatingData = {
  _avg: {
    rating: 4.5,
  },
  _count: {
    id: 10,
  },
  _sum: {
    rating: 45,
  },
  _min: {
    rating: 1,
  },
  _max: {
    rating: 5,
  },
};

const prismaMock = {
  product: {
    create: jest.fn().mockReturnValue(fakeProducts[0]),
    findMany: jest.fn().mockResolvedValue(fakeProducts),
    findUnique: jest.fn().mockResolvedValue(fakeProducts[0]),
    update: jest.fn().mockResolvedValue(fakeProducts[0]),
    delete: jest.fn(),
  },
  review: {
    aggregate: jest.fn().mockResolvedValue(fakeRatingData),
  },
}

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaMock }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    it(`should return an array of products`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeProducts);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    });

    it(`should throw an HttpException when an error occurs while getting the product list`, async () => {
      jest.spyOn(prismaMock.product, 'findMany').mockRejectedValue(new Error('Database error'));

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          'Houve um erro na listagem de produtos. Tente novamente mais tarde.',
        );
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          category: true,
          image_url: true,
        },
      });
    });


  });

  describe('findOne', () => {
    it(`should return a single product`, async () => {

      // Simular a resposta do Prisma para o produto existente
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(fakeProducts[0]);

      // Simular a resposta do Prisma para os dados de classificação
      jest.spyOn(prisma.review, 'aggregate').mockResolvedValue(fakeRatingData);

      const result = await service.findOne(1);

      expect(result).toEqual({
        product: {
          ...fakeProducts[0],
          average_rating: fakeRatingData._avg.rating,
          count_ratings: fakeRatingData._count.id,
        },
      });

      // Verificar se o método do Prisma foi chamado corretamente
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        select: {
          id: true,
          name: true,
          category: true,
          image_url: true,
        },
      });
      expect(prisma.review.aggregate).toHaveBeenCalledWith({
        where: {
          ratedProductId: 1,
        },
        _avg: {
          rating: true,
        },
        _count: {
          id: true,
        },
      });
    });


    it(`should return nothing when product is not found`, async () => {
      jest.spyOn(prisma.product, 'findUnique').mockRejectedValue(undefined);

      await expect(service.findOne(99)).rejects.toThrow(HttpException);

      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
        select: { id: true, name: true, category: true, image_url: true },
      });
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      // Mock do método nameExists para retornar falso
      jest.spyOn(service, 'nameExists').mockResolvedValue(false);

      // Dados de entrada para o método create
      const createProductDto = {
        name: 'Product 1',
        category: 'Category 1',
        image_url: '',
      };

      // Dados de retorno simulados do método create
      const createdProduct = {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        image_url: '', // Adicione a propriedade image_url com um valor padrão ou deixe em branco
        createdAt: new Date(), // Adicione a propriedade createdAt com um valor padrão ou deixe em branco
        updatedAt: new Date(), // Adicione a propriedade updatedAt com um valor padrão ou deixe em branco
      };

      // Mock do método create para retornar o produto criado
      jest.spyOn(prisma.product, 'create').mockResolvedValue(createdProduct);

      // Chamar o método create
      const result = await service.create(createProductDto);

      // Verificar se o método nameExists foi chamado corretamente
      expect(service.nameExists).toHaveBeenCalledWith(createProductDto.name);

      // Verificar se o resultado retornado é o produto criado
      expect(result).toEqual(createdProduct);
    });

    it(`should throw an HttpException when product name already exists`, async () => {
      const existingProductName = 'RTX 4060 Ti';

      jest.spyOn(prismaMock.product, 'findUnique').mockResolvedValue({
        id: 1,
        name: existingProductName,
        category: 'placa-de-video',
        image_url: 'https://example.com/image.jpg',
      });

      const createProductDto = {
        name: existingProductName,
        category: 'outra-categoria',
        image_url: 'https://example.com/another-image.jpg',
      };

      try {
        await service.create(createProductDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('O Nome especificado já está em uso.');
        expect(error.getStatus()).toBe(HttpStatus.FORBIDDEN);
      }

      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { name: existingProductName },
      });
    });

  });

  describe('updateProduct', () => {
    it(`should throw an HttpException when an error occurs while getting the product list`, async () => {
      jest.spyOn(prismaMock.product, 'findMany').mockRejectedValue(new Error('Database error'));

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          'Houve um erro na listagem de produtos. Tente novamente mais tarde.',
        );
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          category: true,
          image_url: true,
        },
      });
    });

    it(`should update an existing product`, async () => {
      const existingProductId = 1;

      jest.spyOn(prismaMock.product, 'findUnique').mockResolvedValue(fakeProducts[0]);

      const updateProductDto = {
        name: 'Novo Nome do Produto',
        category: 'nova-categoria',
        image_url: 'https://example.com/new-image.jpg',
      };

      const response = await service.update(existingProductId, updateProductDto);

      // Verifica se o produto foi atualizado corretamente
      expect(response).toEqual({ message: 'Produto alterado com sucesso.' });

      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: existingProductId },
      });

      expect(prismaMock.product.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: existingProductId },
        data: updateProductDto,
      });
    });

  });

  describe('deleteProducts', () => {

    it(`should remove an existing product`, async () => {
      const existingProductId = 1;

      jest.spyOn(prismaMock.product, 'findUnique').mockResolvedValue(fakeProducts[0]);

      const response = await service.remove(existingProductId);

      expect(response).toEqual({ message: 'Produto excluído com sucesso.' });

      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: existingProductId },
      });

      expect(prismaMock.product.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: { id: existingProductId },
      });
    });

    it(`should throw an HttpException when trying to remove a non-existent product`, async () => {
      const nonExistentProductId = 9999;

      jest.spyOn(prismaMock.product, 'findUnique').mockResolvedValue(null);

      try {
        await service.remove(nonExistentProductId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Produto inválido.');
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }

      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: nonExistentProductId },
      });

      expect(prismaMock.product.delete).not.toHaveBeenCalled();
    });


  })

});
