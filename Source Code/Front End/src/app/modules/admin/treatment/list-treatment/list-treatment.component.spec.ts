import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreatmentComponent } from './list-treatment.component';

describe('ListTreatmentComponent', () => {
  let component: ListTreatmentComponent;
  let fixture: ComponentFixture<ListTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
