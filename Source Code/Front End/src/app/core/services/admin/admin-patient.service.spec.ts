import { TestBed } from '@angular/core/testing';

import { AdminPatientService } from './admin-patient.service';

describe('AdminPatientService', () => {
  let service: AdminPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
