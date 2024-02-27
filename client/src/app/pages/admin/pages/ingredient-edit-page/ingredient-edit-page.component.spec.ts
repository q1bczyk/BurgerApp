import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditPageComponent } from './ingredient-edit-page.component';

describe('IngredientEditPageComponent', () => {
  let component: IngredientEditPageComponent;
  let fixture: ComponentFixture<IngredientEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientEditPageComponent]
    });
    fixture = TestBed.createComponent(IngredientEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
