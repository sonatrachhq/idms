import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocObjAdminComponent } from './assoc-obj-admin.component';

describe('AssocObjAdminComponent', () => {
  let component: AssocObjAdminComponent;
  let fixture: ComponentFixture<AssocObjAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssocObjAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocObjAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
