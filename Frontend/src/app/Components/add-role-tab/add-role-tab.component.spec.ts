import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleTabComponent } from './add-role-tab.component';

describe('AddRoleTabComponent', () => {
  let component: AddRoleTabComponent;
  let fixture: ComponentFixture<AddRoleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
