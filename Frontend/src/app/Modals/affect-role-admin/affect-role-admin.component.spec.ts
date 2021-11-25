import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectRoleAdminComponent } from './affect-role-admin.component';

describe('AffectRoleAdminComponent', () => {
  let component: AffectRoleAdminComponent;
  let fixture: ComponentFixture<AffectRoleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectRoleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectRoleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
