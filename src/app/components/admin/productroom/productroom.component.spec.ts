import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductroomComponent } from './productroom.component';

describe('ProductroomComponent', () => {
  let component: ProductroomComponent;
  let fixture: ComponentFixture<ProductroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
