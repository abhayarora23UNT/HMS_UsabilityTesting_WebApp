import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOperativeComponent } from './edit-operative.component';

describe('EditOperativeComponent', () => {
  let component: EditOperativeComponent;
  let fixture: ComponentFixture<EditOperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOperativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
