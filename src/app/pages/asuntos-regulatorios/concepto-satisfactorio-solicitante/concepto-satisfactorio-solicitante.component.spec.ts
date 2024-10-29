import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoSatisfactorioSolicitanteComponent } from './concepto-satisfactorio-solicitante.component';

describe('ConceptoSatisfactorioComponent', () => {
  let component: ConceptoSatisfactorioSolicitanteComponent;
  let fixture: ComponentFixture<ConceptoSatisfactorioSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptoSatisfactorioSolicitanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoSatisfactorioSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
