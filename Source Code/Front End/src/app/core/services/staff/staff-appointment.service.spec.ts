import { TestBed } from '@angular/core/testing';

import { StaffAppointmentService } from './staff-appointment.service';

describe('StaffAppointmentService', () => {
  let service: StaffAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
