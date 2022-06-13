import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListPatientMedicinesComponent } from './staff-list-patient-medicines.component';

describe('StaffListPatientMedicinesComponent', () => {
  let component: StaffListPatientMedicinesComponent;
  let fixture: ComponentFixture<StaffListPatientMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffListPatientMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffListPatientMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
