import { TestBed } from '@angular/core/testing';

import { PagoPseService } from './pago-pse.service';

describe('PagoPseService', () => {
  let service: PagoPseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoPseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
