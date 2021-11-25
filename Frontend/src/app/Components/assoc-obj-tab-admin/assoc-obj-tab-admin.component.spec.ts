import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocObjTabAdminComponent } from './assoc-obj-tab-admin.component';

describe('AssocObjTabAdminComponent', () => {
  let component: AssocObjTabAdminComponent;
  let fixture: ComponentFixture<AssocObjTabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssocObjTabAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocObjTabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
