import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionPreliminarComponent } from './revision-preliminar.component';

describe('RevisionPreliminarComponent', () => {
  let component: RevisionPreliminarComponent;
  let fixture: ComponentFixture<RevisionPreliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionPreliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionPreliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
