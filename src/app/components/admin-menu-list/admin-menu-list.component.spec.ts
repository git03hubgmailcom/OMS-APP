import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuListComponent } from './admin-menu-list.component';

describe('AdminMenuListComponent', () => {
  let component: AdminMenuListComponent;
  let fixture: ComponentFixture<AdminMenuListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMenuListComponent]
    });
    fixture = TestBed.createComponent(AdminMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
