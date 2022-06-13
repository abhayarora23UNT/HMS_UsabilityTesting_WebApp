import { TestBed } from '@angular/core/testing';

import { AdminOperativeRoomService } from './admin-operative-room.service';

describe('AdminOperativeRoomService', () => {
  let service: AdminOperativeRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOperativeRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
