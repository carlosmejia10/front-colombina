import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralArComponent } from './lateral-ar.component';

describe('LateralComponent', () => {
  let component: LateralArComponent;
  let fixture: ComponentFixture<LateralArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralArComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
