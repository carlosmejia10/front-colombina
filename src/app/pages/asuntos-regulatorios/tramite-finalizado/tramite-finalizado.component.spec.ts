import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteFinalizadoComponent } from './tramite-finalizado.component';

describe('TramiteFinalizadoComponent', () => {
  let component: TramiteFinalizadoComponent;
  let fixture: ComponentFixture<TramiteFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteFinalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TramiteFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
