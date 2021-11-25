import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObjAdminComponent } from './delete-obj-admin.component';

describe('DeleteObjAdminComponent', () => {
  let component: DeleteObjAdminComponent;
  let fixture: ComponentFixture<DeleteObjAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteObjAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteObjAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
