import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionInvimaComponent } from './aprobacion-invima.component';

describe('AprobacionInvimaComponent', () => {
  let component: AprobacionInvimaComponent;
  let fixture: ComponentFixture<AprobacionInvimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobacionInvimaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionInvimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
