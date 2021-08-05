import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipAppCardComponent } from './flip-app-card.component';

describe('FlipAppCardComponent', () => {
  let component: FlipAppCardComponent;
  let fixture: ComponentFixture<FlipAppCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipAppCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
