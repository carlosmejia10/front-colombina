import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTramiteComponent } from './crear-tramite.component';

describe('CrearTramiteComponent', () => {
  let component: CrearTramiteComponent;
  let fixture: ComponentFixture<CrearTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
