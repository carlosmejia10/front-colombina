import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesAdminComponent } from './notificaciones-admin.component';

describe('NotificacionesAdminComponent', () => {
  let component: NotificacionesAdminComponent;
  let fixture: ComponentFixture<NotificacionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
