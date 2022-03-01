import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageOtherAppsComponent } from './home-page-other-apps.component';

describe('HomePageOtherAppsComponent', () => {
  let component: HomePageOtherAppsComponent;
  let fixture: ComponentFixture<HomePageOtherAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageOtherAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageOtherAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
