import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectOrderDetailsComponent } from './my-collect-order-details.component';

describe('MyCollectOrderDetailsComponent', () => {
  let component: MyCollectOrderDetailsComponent;
  let fixture: ComponentFixture<MyCollectOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCollectOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCollectOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
