import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLinksComponent } from './admin-links.component';

describe('AdminLinksComponent', () => {
  let component: AdminLinksComponent;
  let fixture: ComponentFixture<AdminLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLinksComponent]
    });
    fixture = TestBed.createComponent(AdminLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
