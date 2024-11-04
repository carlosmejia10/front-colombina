import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArLayoutComponent } from './ar-layout.component';

describe('ArLayoutComponent', () => {
  let component: ArLayoutComponent;
  let fixture: ComponentFixture<ArLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
