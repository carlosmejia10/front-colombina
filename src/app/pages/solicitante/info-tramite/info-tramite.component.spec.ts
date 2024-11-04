import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTramiteComponent } from './info-tramite.component';

describe('InfoTramiteComponent', () => {
  let component: InfoTramiteComponent;
  let fixture: ComponentFixture<InfoTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTramiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
