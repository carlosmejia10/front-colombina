import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteLayoutComponent } from './solicitante-layout.component';

describe('SolicitanteLayoutComponent', () => {
  let component: SolicitanteLayoutComponent;
  let fixture: ComponentFixture<SolicitanteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitanteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
