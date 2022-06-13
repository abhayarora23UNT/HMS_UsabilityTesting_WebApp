import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListPatientAppointmentsComponent } from './staff-list-patient-appointments.component';

describe('StaffListPatientAppointmentsComponent', () => {
  let component: StaffListPatientAppointmentsComponent;
  let fixture: ComponentFixture<StaffListPatientAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffListPatientAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListPatientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
