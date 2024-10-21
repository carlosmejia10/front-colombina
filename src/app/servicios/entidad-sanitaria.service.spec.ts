import { TestBed } from '@angular/core/testing';

import { EntidadSanitariaService } from './entidad-sanitaria.service';

describe('EntidadSanitariaService', () => {
  let service: EntidadSanitariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadSanitariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
