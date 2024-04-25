import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecolorComponent } from './pagecolor.component';

describe('PagecolorComponent', () => {
  let component: PagecolorComponent;
  let fixture: ComponentFixture<PagecolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagecolorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagecolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
