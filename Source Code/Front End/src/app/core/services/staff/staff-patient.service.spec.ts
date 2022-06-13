import { TestBed } from '@angular/core/testing';

import { StaffPatientService } from './staff-patient.service';

describe('StaffPatientService', () => {
  let service: StaffPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
