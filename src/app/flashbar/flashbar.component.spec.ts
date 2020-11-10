import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashbarComponent } from './flashbar.component';

describe('FlashbarComponent', () => {
  let component: FlashbarComponent;
  let fixture: ComponentFixture<FlashbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
