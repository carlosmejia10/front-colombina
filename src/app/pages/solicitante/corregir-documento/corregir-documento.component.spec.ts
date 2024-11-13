import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorregirDocumentoComponent } from './corregir-documento.component';

describe('CorregirDocumentoComponent', () => {
  let component: CorregirDocumentoComponent;
  let fixture: ComponentFixture<CorregirDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorregirDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorregirDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
