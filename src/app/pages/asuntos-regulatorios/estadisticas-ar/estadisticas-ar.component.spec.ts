import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasArComponent } from './estadisticas-ar.component';

describe('EstadisticasArComponent', () => {
  let component: EstadisticasArComponent;
  let fixture: ComponentFixture<EstadisticasArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasArComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
