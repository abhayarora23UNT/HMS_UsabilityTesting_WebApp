import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentMedicineComponent } from './add-appointment-medicine.component';

describe('AddAppointmentMedicineComponent', () => {
  let component: AddAppointmentMedicineComponent;
  let fixture: ComponentFixture<AddAppointmentMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
