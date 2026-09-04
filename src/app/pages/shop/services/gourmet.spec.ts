import { TestBed } from '@angular/core/testing';

import { Gourmet } from './gourmet';

describe('Gourmet', () => {
  let service: Gourmet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gourmet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
