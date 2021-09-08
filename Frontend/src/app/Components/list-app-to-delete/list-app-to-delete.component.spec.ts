import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppToDeleteComponent } from './list-app-to-delete.component';

describe('ListAppToDeleteComponent', () => {
  let component: ListAppToDeleteComponent;
  let fixture: ComponentFixture<ListAppToDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppToDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppToDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
