import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorequerimientoComponent } from './autorequerimiento.component';

describe('AutorequerimientoComponent', () => {
  let component: AutorequerimientoComponent;
  let fixture: ComponentFixture<AutorequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorequerimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
