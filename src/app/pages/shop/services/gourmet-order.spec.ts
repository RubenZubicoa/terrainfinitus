import { TestBed } from '@angular/core/testing';

import { GourmetOrderService } from './gourmet-order';

describe('GourmetOrderService', () => {
  let service: GourmetOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GourmetOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
