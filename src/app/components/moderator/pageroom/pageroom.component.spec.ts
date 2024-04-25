import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageroomComponent } from './pageroom.component';

describe('PageroomComponent', () => {
  let component: PageroomComponent;
  let fixture: ComponentFixture<PageroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
