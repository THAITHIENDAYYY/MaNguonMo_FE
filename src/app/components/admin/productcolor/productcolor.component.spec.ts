import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcolorComponent } from './productcolor.component';

describe('ProductcolorComponent', () => {
  let component: ProductcolorComponent;
  let fixture: ComponentFixture<ProductcolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcolorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
