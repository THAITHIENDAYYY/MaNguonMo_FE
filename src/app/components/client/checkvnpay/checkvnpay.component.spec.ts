import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckvnpayComponent } from './checkvnpay.component';

describe('CheckvnpayComponent', () => {
  let component: CheckvnpayComponent;
  let fixture: ComponentFixture<CheckvnpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckvnpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckvnpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
