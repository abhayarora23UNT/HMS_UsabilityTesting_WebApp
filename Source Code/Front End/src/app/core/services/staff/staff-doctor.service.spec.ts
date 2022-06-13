import { TestBed } from '@angular/core/testing';

import { StaffDoctorService } from './staff-doctor.service';

describe('StaffDoctorService', () => {
  let service: StaffDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
