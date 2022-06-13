import { TestBed } from '@angular/core/testing';

import { AdminDoctorService } from './admin-doctor.service';

describe('AdminDoctorService', () => {
  let service: AdminDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
