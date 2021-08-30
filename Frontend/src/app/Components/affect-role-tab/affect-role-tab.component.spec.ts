import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectRoleTabComponent } from './affect-role-tab.component';

describe('AffectRoleTabComponent', () => {
  let component: AffectRoleTabComponent;
  let fixture: ComponentFixture<AffectRoleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectRoleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectRoleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
