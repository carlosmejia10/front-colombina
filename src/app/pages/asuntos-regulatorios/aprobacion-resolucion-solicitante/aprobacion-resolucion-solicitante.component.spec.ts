import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionResolucionSolicitanteComponent } from './aprobacion-resolucion-solicitante.component';

describe('AprobacionResolucionSolicitanteComponent', () => {
  let component: AprobacionResolucionSolicitanteComponent;
  let fixture: ComponentFixture<AprobacionResolucionSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobacionResolucionSolicitanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionResolucionSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
