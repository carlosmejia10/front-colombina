import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaTramiteComponent } from './apertura-tramite.component';

describe('AperturaTramiteComponent', () => {
  let component: AperturaTramiteComponent;
  let fixture: ComponentFixture<AperturaTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
