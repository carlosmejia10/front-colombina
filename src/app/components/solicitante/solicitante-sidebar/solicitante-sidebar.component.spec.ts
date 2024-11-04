import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteSidebarComponent } from './solicitante-sidebar.component';

describe('SolicitanteSidebarComponent', () => {
  let component: SolicitanteSidebarComponent;
  let fixture: ComponentFixture<SolicitanteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitanteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
