import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionOrderDetailsComponent } from './admin-collection-order-details.component';

describe('AdminCollectionOrderDetailsComponent', () => {
  let component: AdminCollectionOrderDetailsComponent;
  let fixture: ComponentFixture<AdminCollectionOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCollectionOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCollectionOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
