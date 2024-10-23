import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInternacionalComponent } from './modificar-internacional.component';

describe('ModificarInternacionalComponent', () => {
  let component: ModificarInternacionalComponent;
  let fixture: ComponentFixture<ModificarInternacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarInternacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarInternacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
