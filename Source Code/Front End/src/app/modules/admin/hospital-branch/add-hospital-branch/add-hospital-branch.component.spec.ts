import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalBranchComponent } from './add-hospital-branch.component';

describe('AddHospitalBranchComponent', () => {
  let component: AddHospitalBranchComponent;
  let fixture: ComponentFixture<AddHospitalBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHospitalBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
