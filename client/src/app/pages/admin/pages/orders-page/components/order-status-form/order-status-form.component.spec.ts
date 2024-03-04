import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusFormComponent } from './order-status-form.component';

describe('OrderStatusFormComponent', () => {
  let component: OrderStatusFormComponent;
  let fixture: ComponentFixture<OrderStatusFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusFormComponent]
    });
    fixture = TestBed.createComponent(OrderStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
