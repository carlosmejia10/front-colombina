import { TestBed } from '@angular/core/testing';

import { SeguimientoTramiteService } from './seguimiento-tramite.service';

describe('SeguimientoTramiteService', () => {
  let service: SeguimientoTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientoTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
