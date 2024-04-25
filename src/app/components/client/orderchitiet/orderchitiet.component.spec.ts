import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderchitietComponent } from './orderchitiet.component';

describe('OrderchitietComponent', () => {
  let component: OrderchitietComponent;
  let fixture: ComponentFixture<OrderchitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderchitietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
