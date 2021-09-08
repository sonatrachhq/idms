import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppToUpdateComponent } from './list-app-to-update.component';

describe('ListAppToUpdateComponent', () => {
  let component: ListAppToUpdateComponent;
  let fixture: ComponentFixture<ListAppToUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppToUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppToUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
