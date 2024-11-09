import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAdminComponent } from './estadisticas-admin.component';

describe('EstadisticasAdminComponent', () => {
  let component: EstadisticasAdminComponent;
  let fixture: ComponentFixture<EstadisticasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
