import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellersSectionComponent } from './bestsellers-section.component';

describe('BestsellersSectionComponent', () => {
  let component: BestsellersSectionComponent;
  let fixture: ComponentFixture<BestsellersSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestsellersSectionComponent]
    });
    fixture = TestBed.createComponent(BestsellersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
