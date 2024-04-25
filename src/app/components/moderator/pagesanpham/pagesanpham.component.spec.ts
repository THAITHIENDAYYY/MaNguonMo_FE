import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesanphamComponent } from './pagesanpham.component';

describe('PagesanphamComponent', () => {
  let component: PagesanphamComponent;
  let fixture: ComponentFixture<PagesanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesanphamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
