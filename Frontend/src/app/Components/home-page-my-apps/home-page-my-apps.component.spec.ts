import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMyAppsComponent } from './home-page-my-apps.component';

describe('HomePageMyAppsComponent', () => {
  let component: HomePageMyAppsComponent;
  let fixture: ComponentFixture<HomePageMyAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageMyAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageMyAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
