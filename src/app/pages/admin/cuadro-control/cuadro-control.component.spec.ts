import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CuadroControlComponent} from "./cuadro-control.component";


describe('CuadroControlComponent', () => {
  let component: CuadroControlComponent;
  let fixture: ComponentFixture<CuadroControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuadroControlComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CuadroControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
