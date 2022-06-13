import { TestBed } from '@angular/core/testing';

import { HospitalBranchService } from './hospital-branch.service';

describe('HospitalBranchService', () => {
  let service: HospitalBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
