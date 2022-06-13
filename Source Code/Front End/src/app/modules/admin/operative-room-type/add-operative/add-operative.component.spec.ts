import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperativeComponent } from './add-operative.component';

describe('AddOperativeComponent', () => {
  let component: AddOperativeComponent;
  let fixture: ComponentFixture<AddOperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOperativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
