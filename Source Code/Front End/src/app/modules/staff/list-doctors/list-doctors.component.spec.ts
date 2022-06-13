import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoctorsComponent } from './list-doctors.component';

describe('ListDoctorsComponent', () => {
  let component: ListDoctorsComponent;
  let fixture: ComponentFixture<ListDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
