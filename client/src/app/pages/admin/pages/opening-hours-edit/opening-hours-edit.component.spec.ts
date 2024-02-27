import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursEditComponent } from './opening-hours-edit.component';

describe('OpeningHoursEditComponent', () => {
  let component: OpeningHoursEditComponent;
  let fixture: ComponentFixture<OpeningHoursEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningHoursEditComponent]
    });
    fixture = TestBed.createComponent(OpeningHoursEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
