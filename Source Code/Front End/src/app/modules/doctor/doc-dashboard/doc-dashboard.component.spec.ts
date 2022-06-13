import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDashboardComponent } from './doc-dashboard.component';

describe('DocDashboardComponent', () => {
  let component: DocDashboardComponent;
  let fixture: ComponentFixture<DocDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
