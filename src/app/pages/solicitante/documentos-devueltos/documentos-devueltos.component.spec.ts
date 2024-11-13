import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosDevueltosComponent } from './documentos-devueltos.component';

describe('DocumentosDevueltosComponent', () => {
  let component: DocumentosDevueltosComponent;
  let fixture: ComponentFixture<DocumentosDevueltosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosDevueltosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosDevueltosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
