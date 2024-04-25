import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagemanagementComponent } from './pagemanagement.component';

describe('PagemanagementComponent', () => {
  let component: PagemanagementComponent;
  let fixture: ComponentFixture<PagemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagemanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
