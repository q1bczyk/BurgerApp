import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsSectionComponent } from './ingredients-section.component';

describe('IngredientsSectionComponent', () => {
  let component: IngredientsSectionComponent;
  let fixture: ComponentFixture<IngredientsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsSectionComponent]
    });
    fixture = TestBed.createComponent(IngredientsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
