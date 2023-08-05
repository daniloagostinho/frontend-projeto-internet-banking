import { TestBed } from '@angular/core/testing';

import { BankingService } from './banking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BankingService', () => {
  let service: BankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
