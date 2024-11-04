import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarComponent } from './renovar.component';

describe('RenovarComponent', () => {
  let component: RenovarComponent;
  let fixture: ComponentFixture<RenovarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
