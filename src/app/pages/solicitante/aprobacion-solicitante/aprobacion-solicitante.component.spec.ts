import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionSolicitanteComponent } from './aprobacion-solicitante.component';

describe('AprobacionSolicitanteComponent', () => {
  let component: AprobacionSolicitanteComponent;
  let fixture: ComponentFixture<AprobacionSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobacionSolicitanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
