import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoControlComponent } from './info-control.component';

describe('InfoControlComponent', () => {
  let component: InfoControlComponent;
  let fixture: ComponentFixture<InfoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
