import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArHeaderComponent } from './ar-header.component';

describe('ArHeaderComponent', () => {
  let component: ArHeaderComponent;
  let fixture: ComponentFixture<ArHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
