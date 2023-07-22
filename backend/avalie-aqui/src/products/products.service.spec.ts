import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';


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

const prismaMock = {
  product: {
    create: jest.fn().mockReturnValue(fakeProducts[0]),
    findMany: jest.fn().mockResolvedValue(fakeProducts),
    findUnique: jest.fn().mockResolvedValue(fakeProducts[0]),
    update: jest.fn().mockResolvedValue(fakeProducts[0]),
    delete: jest.fn(),
  }
}

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {provide: PrismaService, useValue: prismaMock}
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
      expect(prisma.product.findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it(`should return a single product`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return nothing when product is not found`, async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      let payload = {
        name: 'RTX 4060 Ti',
        category: 'placa-de-video',
        image_url:
          'https://files.tecnoblog.net/wp-content/uploads/2023/05/geforce-rtx-4060-ti-back-1060x795.jpg',
      };
    });
  });
});
