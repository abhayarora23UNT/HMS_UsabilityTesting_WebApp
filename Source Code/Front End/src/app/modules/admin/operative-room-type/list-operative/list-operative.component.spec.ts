import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperativeComponent } from './list-operative.component';

describe('ListOperativeComponent', () => {
  let component: ListOperativeComponent;
  let fixture: ComponentFixture<ListOperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOperativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
