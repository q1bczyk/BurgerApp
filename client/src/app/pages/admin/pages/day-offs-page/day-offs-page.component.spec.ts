import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffsPageComponent } from './day-offs-page.component';

describe('DayOffsPageComponent', () => {
  let component: DayOffsPageComponent;
  let fixture: ComponentFixture<DayOffsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayOffsPageComponent]
    });
    fixture = TestBed.createComponent(DayOffsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
