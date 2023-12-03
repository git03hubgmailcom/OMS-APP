import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectOrdersComponent } from './my-collect-orders.component';

describe('MyCollectOrdersComponent', () => {
  let component: MyCollectOrdersComponent;
  let fixture: ComponentFixture<MyCollectOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCollectOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCollectOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
