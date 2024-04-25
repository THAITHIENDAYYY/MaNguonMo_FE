import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiamgiaproductComponent } from './giamgiaproduct.component';

describe('GiamgiaproductComponent', () => {
  let component: GiamgiaproductComponent;
  let fixture: ComponentFixture<GiamgiaproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiamgiaproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiamgiaproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
