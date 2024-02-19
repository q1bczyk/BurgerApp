import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInProgessComponent } from './order-in-progress.component';

describe('OrderInProgessComponent', () => {
  let component: OrderInProgessComponent;
  let fixture: ComponentFixture<OrderInProgessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderInProgessComponent]
    });
    fixture = TestBed.createComponent(OrderInProgessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
