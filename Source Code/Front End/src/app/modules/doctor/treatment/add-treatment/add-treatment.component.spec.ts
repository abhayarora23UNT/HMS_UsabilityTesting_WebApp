import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreatmentComponent } from './add-treatment.component';

describe('AddTreatmentComponent', () => {
  let component: AddTreatmentComponent;
  let fixture: ComponentFixture<AddTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
