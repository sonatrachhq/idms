import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocObjTabComponent } from './assoc-obj-tab.component';

describe('AssocObjTabComponent', () => {
  let component: AssocObjTabComponent;
  let fixture: ComponentFixture<AssocObjTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssocObjTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocObjTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
