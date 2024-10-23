import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDocumentacionComponent } from './revision-documentacion.component';

describe('RevisionDocumentacionComponent', () => {
  let component: RevisionDocumentacionComponent;
  let fixture: ComponentFixture<RevisionDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionDocumentacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
