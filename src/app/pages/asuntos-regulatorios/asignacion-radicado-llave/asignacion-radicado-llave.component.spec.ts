import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionRadicadoLlaveComponent } from './asignacion-radicado-llave.component';

describe('AsignacionRadicadoLlaveComponent', () => {
  let component: AsignacionRadicadoLlaveComponent;
  let fixture: ComponentFixture<AsignacionRadicadoLlaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionRadicadoLlaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionRadicadoLlaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
