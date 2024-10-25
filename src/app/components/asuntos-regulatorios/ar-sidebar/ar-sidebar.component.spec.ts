import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArSidebarComponent } from './ar-sidebar.component';

describe('ArSidebarComponent', () => {
  let component: ArSidebarComponent;
  let fixture: ComponentFixture<ArSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
