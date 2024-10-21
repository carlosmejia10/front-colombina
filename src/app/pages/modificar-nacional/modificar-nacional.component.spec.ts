import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNacionalComponent } from './modificar-nacional.component';

describe('ModificarNacionalComponent', () => {
  let component: ModificarNacionalComponent;
  let fixture: ComponentFixture<ModificarNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarNacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
