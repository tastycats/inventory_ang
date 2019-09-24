import { TestBed } from '@angular/core/testing';

import { NetworkingService } from './networking.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { InventoryItem } from './interfaces/inventory-item';

describe('NetworkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: NetworkingService = TestBed.get(NetworkingService);
    expect(service).toBeTruthy();
  });
});
