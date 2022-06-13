import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalBranchComponent } from './edit-hospital-branch.component';

describe('EditHospitalBranchComponent', () => {
  let component: EditHospitalBranchComponent;
  let fixture: ComponentFixture<EditHospitalBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHospitalBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
