import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroControlAsuntosComponent } from './cuadro-control-asuntos.component';

describe('CuadroControlAsuntosComponent', () => {
  let component: CuadroControlAsuntosComponent;
  let fixture: ComponentFixture<CuadroControlAsuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuadroControlAsuntosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadroControlAsuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
