import { TestBed } from '@angular/core/testing';

import { AdminRoomTypeService } from './admin-room-type.service';

describe('AdminRoomTypeService', () => {
  let service: AdminRoomTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoomTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
