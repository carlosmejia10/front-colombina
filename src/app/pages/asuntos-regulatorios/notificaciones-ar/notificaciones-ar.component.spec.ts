import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesArComponent } from './notificaciones-ar.component';

describe('NotificacionesArComponent', () => {
  let component: NotificacionesArComponent;
  let fixture: ComponentFixture<NotificacionesArComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesArComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
