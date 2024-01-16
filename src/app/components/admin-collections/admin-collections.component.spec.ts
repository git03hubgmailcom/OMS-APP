import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsComponent } from './admin-collections.component';

describe('AdminCollectionsComponent', () => {
  let component: AdminCollectionsComponent;
  let fixture: ComponentFixture<AdminCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCollectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
