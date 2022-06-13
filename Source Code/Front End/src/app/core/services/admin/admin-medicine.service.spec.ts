import { TestBed } from '@angular/core/testing';

import { AdminMedicineService } from './admin-medicine.service';

describe('AdminMedicineService', () => {
  let service: AdminMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
