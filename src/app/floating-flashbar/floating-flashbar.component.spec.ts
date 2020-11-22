import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingFlashbarComponent } from './floating-flashbar.component';

describe('FloatingFlashbarComponent', () => {
  let component: FloatingFlashbarComponent;
  let fixture: ComponentFixture<FloatingFlashbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingFlashbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingFlashbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
