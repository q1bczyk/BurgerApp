import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursPageComponent } from './opening-hours-page.component';

describe('OpeningHoursPageComponent', () => {
  let component: OpeningHoursPageComponent;
  let fixture: ComponentFixture<OpeningHoursPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningHoursPageComponent]
    });
    fixture = TestBed.createComponent(OpeningHoursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
