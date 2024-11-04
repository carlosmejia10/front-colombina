import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraOpcComponent } from './barra-opc.component';

describe('BarraOpcComponent', () => {
  let component: BarraOpcComponent;
  let fixture: ComponentFixture<BarraOpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraOpcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraOpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
