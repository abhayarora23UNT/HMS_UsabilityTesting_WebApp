import { TestBed } from '@angular/core/testing';

import { StaffMedicineService } from './staff-medicine.service';

describe('StaffMedicineService', () => {
  let service: StaffMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
