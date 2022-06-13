import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHospitalBranchComponent } from './list-hospital-branch.component';

describe('ListHospitalBranchComponent', () => {
  let component: ListHospitalBranchComponent;
  let fixture: ComponentFixture<ListHospitalBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHospitalBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHospitalBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
