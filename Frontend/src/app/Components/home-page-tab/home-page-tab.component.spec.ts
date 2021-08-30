import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageTabComponent } from './home-page-tab.component';

describe('HomePageTabComponent', () => {
  let component: HomePageTabComponent;
  let fixture: ComponentFixture<HomePageTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
