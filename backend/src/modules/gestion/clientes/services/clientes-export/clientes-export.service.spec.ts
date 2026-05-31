import { Test, TestingModule } from '@nestjs/testing';
import { ClientesExportService } from '../clientes-export.service';

describe('ClientesExportService', () => {
  let service: ClientesExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesExportService],
    }).compile();

    service = module.get<ClientesExportService>(ClientesExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
