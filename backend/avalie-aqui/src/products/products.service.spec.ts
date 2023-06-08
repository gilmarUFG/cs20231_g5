import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
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
