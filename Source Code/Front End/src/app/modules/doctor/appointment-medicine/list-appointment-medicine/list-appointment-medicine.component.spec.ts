import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentMedicineComponent } from './list-appointment-medicine.component';

describe('ListAppointmentMedicineComponent', () => {
  let component: ListAppointmentMedicineComponent;
  let fixture: ComponentFixture<ListAppointmentMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
