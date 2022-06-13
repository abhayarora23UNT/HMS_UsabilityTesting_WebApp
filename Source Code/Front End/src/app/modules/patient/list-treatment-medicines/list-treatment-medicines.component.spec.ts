import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreatmentMedicinesComponent } from './list-treatment-medicines.component';

describe('ListTreatmentMedicinesComponent', () => {
  let component: ListTreatmentMedicinesComponent;
  let fixture: ComponentFixture<ListTreatmentMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTreatmentMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTreatmentMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
