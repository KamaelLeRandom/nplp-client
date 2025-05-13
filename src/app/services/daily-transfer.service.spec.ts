import { TestBed } from '@angular/core/testing';

import { DailyTransferService } from './daily-transfer.service';

describe('DailyTransferService', () => {
  let service: DailyTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
