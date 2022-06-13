import { TestBed } from '@angular/core/testing';

import { AdminTreatmentService } from './admin-treatment.service';

describe('AdminTreatmentService', () => {
  let service: AdminTreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
