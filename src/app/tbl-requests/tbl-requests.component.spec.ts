import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRequestsComponent } from './tbl-requests.component';

describe('TblRequestsComponent', () => {
  let component: TblRequestsComponent;
  let fixture: ComponentFixture<TblRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
