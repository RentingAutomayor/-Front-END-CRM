import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPreRequestObservationComponent } from './tbl-pre-request-observation.component';

describe('TblPreRequestObservationComponent', () => {
  let component: TblPreRequestObservationComponent;
  let fixture: ComponentFixture<TblPreRequestObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblPreRequestObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblPreRequestObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
