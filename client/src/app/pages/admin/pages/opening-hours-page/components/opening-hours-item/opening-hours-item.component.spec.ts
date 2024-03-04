import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursItemComponent } from './opening-hours-item.component';

describe('OpeningHoursItemComponent', () => {
  let component: OpeningHoursItemComponent;
  let fixture: ComponentFixture<OpeningHoursItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningHoursItemComponent]
    });
    fixture = TestBed.createComponent(OpeningHoursItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
