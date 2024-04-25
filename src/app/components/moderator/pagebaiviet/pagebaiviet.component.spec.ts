import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebaivietComponent } from './pagebaiviet.component';

describe('PagebaivietComponent', () => {
  let component: PagebaivietComponent;
  let fixture: ComponentFixture<PagebaivietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagebaivietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagebaivietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
