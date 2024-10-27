import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoEscogidoComponent } from './documento-escogido.component';

describe('DocumentoEscogidoComponent', () => {
  let component: DocumentoEscogidoComponent;
  let fixture: ComponentFixture<DocumentoEscogidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoEscogidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoEscogidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
