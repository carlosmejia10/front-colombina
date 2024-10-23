import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTramiteComponent } from './tabla-tramite.component';

describe('TablaTramiteComponent', () => {
  let component: TablaTramiteComponent;
  let fixture: ComponentFixture<TablaTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
