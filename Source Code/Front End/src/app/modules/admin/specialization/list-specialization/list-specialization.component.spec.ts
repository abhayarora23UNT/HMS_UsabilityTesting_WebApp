import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecializationComponent } from './list-specialization.component';

describe('ListSpecializationComponent', () => {
  let component: ListSpecializationComponent;
  let fixture: ComponentFixture<ListSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
