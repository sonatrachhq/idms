import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocObjComponent } from './assoc-obj.component';

describe('AssocObjComponent', () => {
  let component: AssocObjComponent;
  let fixture: ComponentFixture<AssocObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssocObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
