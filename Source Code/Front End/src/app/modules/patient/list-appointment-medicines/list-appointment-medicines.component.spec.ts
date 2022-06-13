import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentMedicinesComponent } from './list-appointment-medicines.component';

describe('ListAppointmentMedicinesComponent', () => {
  let component: ListAppointmentMedicinesComponent;
  let fixture: ComponentFixture<ListAppointmentMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
