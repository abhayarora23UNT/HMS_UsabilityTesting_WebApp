import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdmissionComponent } from './list-admission.component';

describe('ListAdmissionComponent', () => {
  let component: ListAdmissionComponent;
  let fixture: ComponentFixture<ListAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
