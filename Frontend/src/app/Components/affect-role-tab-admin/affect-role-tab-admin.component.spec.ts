import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectRoleTabAdminComponent } from './affect-role-tab-admin.component';

describe('AffectRoleTabAdminComponent', () => {
  let component: AffectRoleTabAdminComponent;
  let fixture: ComponentFixture<AffectRoleTabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectRoleTabAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectRoleTabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
