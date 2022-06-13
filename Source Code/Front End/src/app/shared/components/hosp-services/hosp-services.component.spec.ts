import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospServicesComponent } from './hosp-services.component';

describe('HospServicesComponent', () => {
  let component: HospServicesComponent;
  let fixture: ComponentFixture<HospServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
