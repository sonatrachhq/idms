import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleToDeleteComponent } from './list-role-to-delete.component';

describe('ListRoleToDeleteComponent', () => {
  let component: ListRoleToDeleteComponent;
  let fixture: ComponentFixture<ListRoleToDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoleToDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoleToDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
