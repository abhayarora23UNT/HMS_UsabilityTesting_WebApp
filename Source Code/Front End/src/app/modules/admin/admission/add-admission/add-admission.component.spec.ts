import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmissionComponent } from './add-admission.component';

describe('AddAdmissionComponent', () => {
  let component: AddAdmissionComponent;
  let fixture: ComponentFixture<AddAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
