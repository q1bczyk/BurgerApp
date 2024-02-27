import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAdminItemComponent } from './ingredient-admin-item.component';

describe('IngredientAdminItemComponent', () => {
  let component: IngredientAdminItemComponent;
  let fixture: ComponentFixture<IngredientAdminItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientAdminItemComponent]
    });
    fixture = TestBed.createComponent(IngredientAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
