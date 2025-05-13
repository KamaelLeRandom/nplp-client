import { TestBed } from '@angular/core/testing';

import { CutTransferService } from './cut-transfer.service';

describe('CutTransferService', () => {
  let service: CutTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
