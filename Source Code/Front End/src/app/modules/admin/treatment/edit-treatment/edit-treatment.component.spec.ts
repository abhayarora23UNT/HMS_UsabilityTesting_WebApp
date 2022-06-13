import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreatmentComponent } from './edit-treatment.component';

describe('EditTreatmentComponent', () => {
  let component: EditTreatmentComponent;
  let fixture: ComponentFixture<EditTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
