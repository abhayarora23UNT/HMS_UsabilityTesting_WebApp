import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocHomeComponent } from './doc-home.component';

describe('DocHomeComponent', () => {
  let component: DocHomeComponent;
  let fixture: ComponentFixture<DocHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
