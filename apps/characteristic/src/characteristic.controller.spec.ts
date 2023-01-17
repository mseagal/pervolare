import { Test, TestingModule } from '@nestjs/testing';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';

describe('CharacteristicController', () => {
  let characteristicController: CharacteristicController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CharacteristicController],
      providers: [CharacteristicService],
    }).compile();

    characteristicController = app.get<CharacteristicController>(CharacteristicController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(characteristicController.getHello()).toBe('Hello World!');
    });
  });
});
