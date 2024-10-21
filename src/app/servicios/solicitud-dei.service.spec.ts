import { TestBed } from '@angular/core/testing';

import { SolicitudDeiService } from './solicitud-dei.service';

describe('SolicitudDeiService', () => {
  let service: SolicitudDeiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDeiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
