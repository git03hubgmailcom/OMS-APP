import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionOrdersComponent } from './admin-collection-orders.component';

describe('AdminCollectionOrdersComponent', () => {
  let component: AdminCollectionOrdersComponent;
  let fixture: ComponentFixture<AdminCollectionOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCollectionOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCollectionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
