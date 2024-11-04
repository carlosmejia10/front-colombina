import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionResolucionRechazadaComponent } from './aprobacion-resolucion-rechazada.component';

describe('AprobacionResolucionRechazadaComponent', () => {
  let component: AprobacionResolucionRechazadaComponent;
  let fixture: ComponentFixture<AprobacionResolucionRechazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobacionResolucionRechazadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionResolucionRechazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
