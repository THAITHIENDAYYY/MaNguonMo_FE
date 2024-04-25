import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsizeComponent } from './productsize.component';

describe('ProductsizeComponent', () => {
  let component: ProductsizeComponent;
  let fixture: ComponentFixture<ProductsizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
