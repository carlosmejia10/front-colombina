import { TestBed } from '@angular/core/testing';

import { TramiteRegulatorioService } from './tramite-regulatorio.service';

describe('TramiteRegulatorioService', () => {
  let service: TramiteRegulatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramiteRegulatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
