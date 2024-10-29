import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoSatisfactorioComponent } from './concepto-satisfactorio.component';

describe('ConceptoSatisfactorioComponent', () => {
  let component: ConceptoSatisfactorioComponent;
  let fixture: ComponentFixture<ConceptoSatisfactorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptoSatisfactorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoSatisfactorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
