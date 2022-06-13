import { TestBed } from '@angular/core/testing';

import { AdminSpecializationService } from './admin-specialization.service';

describe('AdminSpecializationService', () => {
  let service: AdminSpecializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSpecializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
